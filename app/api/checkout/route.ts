import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { createOrder } from "@/lib/strapi";

const RESTRICTED_CATEGORIES = ["licores", "cigarrillos"];

export async function POST(req: NextRequest) {
  try {
    const { items, userEmail, customerNumber, shippingAddress, CC } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }
    if (!userEmail || !customerNumber || !shippingAddress) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Debes iniciar sesión para comprar" }, { status: 401 });
    }

    const haveLicorTheOrder = items.some((i: any) =>
      RESTRICTED_CATEGORIES.includes(i.categorySlug || "")
    );
    if (haveLicorTheOrder && !CC) {
      return NextResponse.json({ error: "Se requiere cédula para este pedido" }, { status: 400 });
    }

    const total = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
    const amountInCents = total * 100;
    const currency = "COP";
    const orderNumber = `ORD-${Date.now()}`;

    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET!;
    const signatureString = `${orderNumber}${amountInCents}${currency}${integritySecret}`;
    const signature = crypto.createHash("sha256").update(signatureString).digest("hex");

    await createOrder({
      orderNumber,
      items: items.map((i: any) => ({
        productId: i.productId,
        productDocumentId: i.documentId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      subtotal: total,
      userId,
      userEmail,
      customerNumber,
      shippingAddress,
      haveLicorTheOrder,
      CC,
    });

    return NextResponse.json({
      reference: orderNumber,
      amountInCents,
      currency,
      signature,
      publicKey: process.env.WOMPI_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Error en checkout:", error);
    return NextResponse.json({ error: "Error al procesar la orden" }, { status: 500 });
  }
}