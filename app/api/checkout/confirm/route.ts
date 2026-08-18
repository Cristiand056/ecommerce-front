// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { createOrder } from "@/lib/strapi";

const RESTRICTED_CATEGORIES = ["licores", "cigarrillos"];

export async function POST(req: NextRequest) {
  try {
    const { product, quantity, userEmail, customerNumber, shippingAddress, CC } = await req.json();

    if (!product || !quantity || quantity <= 0 || !userEmail || !customerNumber || !shippingAddress) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Debes iniciar sesión para comprar" }, { status: 401 });
    }

    const haveLicorTheOrder = RESTRICTED_CATEGORIES.includes(product.categorySlug || "");
    if (haveLicorTheOrder && !CC) {
      return NextResponse.json({ error: "Se requiere cédula para este producto" }, { status: 400 });
    }

    const total = product.price * quantity;
    const amountInCents = total * 100;
    const currency = "COP";
    const orderNumber = `ORD-${product.slug}-${Date.now()}`;

    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET!;
    const signatureString = `${orderNumber}${amountInCents}${currency}${integritySecret}`;
    const signature = crypto.createHash("sha256").update(signatureString).digest("hex");

    await createOrder({
      orderNumber,
      items: [
        {
          productId: product.id,
          productDocumentId: product.documentId,
          name: product.title,
          price: product.price,
          quantity,
        },
      ],
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
      reference: orderNumber, // Wompi lo llama "reference", nosotros lo mapeamos a orderNumber
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