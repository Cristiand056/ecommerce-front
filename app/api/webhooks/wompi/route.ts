// app/api/webhooks/wompi/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrderByReference, updateOrderStatus, decrementProductStock } from "@/lib/strapi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔔 WEBHOOK RECIBIDO:", JSON.stringify(body, null, 2)); 
    const { signature, timestamp, data, event: eventType } = body;

    if (!signature?.properties || !signature?.checksum || !timestamp || !data) {
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
    }

    const eventsSecret = process.env.WOMPI_EVENTS_SECRET!;
    let concatenated = "";
    for (const propPath of signature.properties as string[]) {
      const value = propPath.split(".").reduce((obj: any, key: string) => obj?.[key], data);
      concatenated += value;
    }
    concatenated += timestamp;
    concatenated += eventsSecret;

    const expectedChecksum = crypto.createHash("sha256").update(concatenated).digest("hex").toUpperCase();

    if (expectedChecksum !== signature.checksum.toUpperCase()) {
      console.warn("⚠️ Firma de webhook inválida");
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    if (eventType !== "transaction.updated") {
      return NextResponse.json({ status: "ignored" });
    }

    const transaction = data.transaction;

    const order = await getOrderByReference(transaction.reference);
    console.log("🔍 Orden encontrada:", order);
    console.log("🔍 order.documentId:", order?.documentId);
    console.log("🔍 order.items:", order?.items);
    if (!order) {
      console.warn(`⚠️ Orden inexistente: ${transaction.reference}`);
      return NextResponse.json({ status: "order_not_found" });
    }

    // Idempotencia: si ya no está en "pending", ya fue procesada antes
    if (order.statusOrder !== "pending") {
      return NextResponse.json({ status: "already_processed" });
    }

    if (transaction.status === "APPROVED") {
      await updateOrderStatus(order.documentId, "processing", transaction.id);

      for (const item of order.items) {
        await decrementProductStock(item.productDocumentId, item.quantity);
      }

      return NextResponse.json({ status: "processing" });
    } else {
      await updateOrderStatus(order.documentId, "canceled", transaction.id);
      return NextResponse.json({ status: "canceled" });
    }
  } catch (error) {
    console.error("Error procesando webhook de Wompi:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}