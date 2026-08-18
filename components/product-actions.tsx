"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/quantity-selector";
import { CheckoutForm } from "@/components/checkout-form";
import { useCart } from "@/components/cart-context";

interface ProductActionsProps {
  product: {
    id: number;
    documentId: string;
    slug: string;
    title: string;
    price: number;
    stock: number;
    imageSrc: string;
    categorySlug?: string;
  };
  outOfStock: boolean;
}

export function ProductActions({ product, outOfStock }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(product.stock > 0 ? 1 : 0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        documentId: product.documentId,
        slug: product.slug,
        name: product.title,
        price: product.price,
        imageSrc: product.imageSrc,
        stock: product.stock,
        categorySlug: product.categorySlug,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <QuantitySelector stock={product.stock} onChange={setQuantity} />
        <Button
          className="flex-1 min-w-[200px] h-11 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={outOfStock}
          onClick={handleAddToCart}
        >
          {outOfStock ? "Agotado" : added ? "¡Agregado! ✓" : "Agregar al carrito"}
        </Button>
      </div>

      {showCheckout && (
        <CheckoutForm
          items={[
            {
              productId: product.id,
              documentId: product.documentId,
              name: product.title,
              price: product.price,
              quantity,
              categorySlug: product.categorySlug,
            },
          ]}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {!showCheckout && (
        <Button
          className="w-full h-11 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full transition-colors mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={outOfStock}
          onClick={() => setShowCheckout(true)}
        >
          {outOfStock ? "No disponible" : "Comprar Ahora"}
        </Button>
      )}
    </>
  );
}