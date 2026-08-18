"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    WidgetCheckout: any;
  }
}

interface CheckoutItem {
  productId: number;
  documentId: string;
  name: string;
  price: number;
  quantity: number;
  categorySlug?: string;
}

interface CheckoutFormProps {
  items: CheckoutItem[];
  onClose: () => void;
  onSuccess?: () => void;
}

const RESTRICTED_CATEGORIES = ["licores", "cigarrillos"];

export function CheckoutForm({ items, onClose, onSuccess }: CheckoutFormProps) {
  const { user } = useUser();
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cc, setCc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requiresCC = items.some((i) => RESTRICTED_CATEGORIES.includes(i.categorySlug || ""));
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async () => {
    setError(null);

    if (!email || !phone || !address) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    if (requiresCC && !cc) {
      setError("Se requiere cédula para verificar mayoría de edad.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          userEmail: email,
          customerNumber: phone,
          shippingAddress: address,
          CC: requiresCC ? cc : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al iniciar el pago");
      if (!window.WidgetCheckout) throw new Error("El widget de Wompi no está cargado todavía.");

      const checkout = new window.WidgetCheckout({
        currency: data.currency,
        amountInCents: data.amountInCents,
        reference: data.reference,
        publicKey: data.publicKey,
        signature: { integrity: data.signature },
      });

      checkout.open((result: any) => {
        console.log("Resultado de la transacción:", result.transaction);
        onSuccess?.();
        onClose();
      });
    } catch (err: any) {
      console.error("Error al procesar el pago:", err);
      setError(err.message || "Hubo un error al procesar tu compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-white space-y-3">
      <h3 className="font-bold text-gray-900 text-sm mb-2">Datos de entrega</h3>

      <div>
        <label className="text-xs font-semibold text-gray-700">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm mt-1"
          placeholder="tucorreo@ejemplo.com"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-700">Teléfono de contacto</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm mt-1"
          placeholder="300 123 4567"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-700">Dirección de envío</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm mt-1"
          placeholder="Calle 123 #45-67, Bogotá"
        />
      </div>

      {requiresCC && (
        <div>
          <label className="text-xs font-semibold text-gray-700">
            Cédula (requerido para verificar mayoría de edad)
          </label>
          <input
            type="text"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm mt-1"
            placeholder="1036000000"
          />
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

      <div className="border-t pt-3 flex justify-between items-center text-sm font-bold text-gray-900">
        <span>Total</span>
        <span>{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(total)}</span>
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          className="flex-1 bg-brand-red hover:bg-brand-red-dark text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Confirmar y pagar"}
        </Button>
      </div>
    </div>
  );
}