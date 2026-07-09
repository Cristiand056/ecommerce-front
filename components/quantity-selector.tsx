// components/quantity-selector.tsx
"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantitySelector({
  stock,
  onChange,
}: {
  stock: number;
  onChange?: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(stock > 0 ? 1 : 0);

  const updateQuantity = (newQty: number) => {
    // No permite bajar de 1 ni subir más del stock disponible
    const clamped = Math.max(1, Math.min(newQty, stock));
    setQuantity(clamped);
    onChange?.(clamped);
  };

  if (stock <= 0) {
    return (
      <span className="text-sm font-bold text-red-600">
        Agotado
      </span>
    );
  }

  return (
    <div className="flex items-center bg-white rounded-full border border-gray-300 h-11 px-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-600"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-600"
        onClick={() => updateQuantity(quantity + 1)}
        disabled={quantity >= stock}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}