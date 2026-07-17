// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const CHATBOT_API_URL = process.env.CHATBOT_API_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
    }

    const response = await fetch(`${CHATBOT_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "El servicio de chatbot no respondió correctamente" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error conectando con el chatbot:", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el servicio de chatbot" },
      { status: 500 }
    );
  }
}