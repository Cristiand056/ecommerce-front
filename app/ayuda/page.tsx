import { ChatbotWidget } from "@/components/chatbot-widget";

export default function AyudaPage() {
  return (
    <main className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Centro de Ayuda
        </h1>
        <p className="text-gray-600 text-center mb-8">
          ¿Tienes dudas? Pregúntale a nuestro asistente virtual.
        </p>
        <ChatbotWidget />
      </div>
    </main>
  );
}