// app/mi-cuenta/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Package, ChevronRight } from "lucide-react";
import { getOrdersByUser } from "@/lib/strapi";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: "Pendiente de pago", className: "bg-yellow-100 text-yellow-800" },
  processing: { label: "En preparación", className: "bg-blue-100 text-blue-800" },
  shipping: { label: "En camino", className: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregado", className: "bg-green-100 text-green-800" },
  canceled: { label: "Cancelado", className: "bg-red-100 text-red-800" },
};

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
};

export default async function MiCuentaPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const orders = await getOrdersByUser(userId);

  return (
    <main className="min-h-screen bg-brand-cream py-8 px-4 md:px-6">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-gray-600 mb-8">Historial de tus compras.</p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center">
            <Package className="h-10 w-10 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Aún no tienes pedidos.</p>
            <Link href="/catalogo" className="text-brand-red font-semibold hover:underline">
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => {
              const status = STATUS_LABELS[order.statusOrder] || {
                label: order.statusOrder,
                className: "bg-gray-100 text-gray-800",
              };

              return (
                <div key={order.id} className="bg-white rounded-lg border p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="border-t pt-3 space-y-1">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm text-gray-700">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-3 pt-3 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-brand-red">{formatPrice(order.total)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}