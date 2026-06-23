// app/pedido-especial/page.tsx
import CustomOrderForm from "@/components/form-pers";

export default function PedidoEspecialPage() {
  return (
    <main className="container px-4 md:px-16 max-w-5xl mx-auto py-12 md:py-16 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          ¿Tienes un Evento o Pedido Especial?
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Cuéntanos qué marcas de licores o productos al por mayor necesitas en Bogotá y te armamos una cotización a tu medida con precios de distribuidor.
        </p>
      </div>

      <CustomOrderForm />
    </main>
  );
}