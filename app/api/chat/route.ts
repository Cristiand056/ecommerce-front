import { NextRequest, NextResponse } from "next/server";

const CHATBOT_API_URL = process.env.CHATBOT_API_URL || "http://localhost:8000";

const INTENT_ROUTES: Record<string, string> = {
  "consulta_licores": "/catalogo",
  "consulta_cigarrillos": "/catalogo",
  "consulta_dulces": "/catalogo",
  "consulta_delicatessen": "/catalogo",
  "hacer_pedido": "/catalogo",
  "pedido_personalizado": "/pedido-especial",
  "crear_peticion": "/mi-cuenta",
  "registro": "/sign-up",
  "recuperar_contrasena": "/sign-in"
};

interface ChatbotBackendResponse {
  reply: string;
  intent: string;
  confidence: number;
}

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

    const data: ChatbotBackendResponse = await response.json();

    const route = INTENT_ROUTES[data.intent] || undefined;

    return NextResponse.json({
      reply: data.reply,
      route: route,
    });

  } catch (error) {
    console.error("Error conectando con el chatbot:", error);
    return NextResponse.json(
      { error: "No se pudo conectar con el servicio de chatbot" },
      { status: 500 }
    );
  }
}