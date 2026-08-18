"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-context";
import { CheckoutForm } from "@/components/checkout-form";

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-brand-cream py-16 px-4 text-center">
        <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
        <Link href="/catalogo" className="text-brand-red font-semibold hover:underline">
          Ir al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream py-8 px-4 md:px-6">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Tu Carrito</h1>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.productId} className="bg-white rounded-lg border p-4 flex gap-4">
              <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                <Image src={item.imageSrc} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                <p className="text-brand-red font-bold text-sm mt-1">{formatPrice(item.price)}</p>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border rounded-full">
                    <button
                      className="p-1.5 text-gray-600"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      className="p-1.5 text-gray-600"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="text-right font-bold text-gray-900 text-sm">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border p-4 mb-6 flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-brand-red">{formatPrice(totalPrice)}</span>
        </div>

        {showCheckout ? (
          <CheckoutForm
            items={items.map((i) => ({
              productId: i.productId,
              documentId: i.documentId,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
              categorySlug: i.categorySlug,
            }))}
            onClose={() => setShowCheckout(false)}
            onSuccess={clearCart}
          />
        ) : (
          <Button
            className="w-full h-11 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full"
            onClick={() => setShowCheckout(true)}
          >
            Proceder al pago
          </Button>
        )}
      </div>
    </main>
  );
}