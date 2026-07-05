import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const fallbackImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==";

export function ProductCard({
  name,
  price,
  imageSrc,
  href,
}: {
  name: string;
  price: number;
  imageSrc: string;
  href?: string;
}) {
  const CardContent = () => (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="absolute inset-0 z-10" aria-hidden="true"></div>
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          // ✅ Validamos rigurosamente que sea un string y que no esté vacío
          src={typeof imageSrc === "string" && imageSrc.trim() !== "" ? imageSrc  :      fallbackImage}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform        group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-2 right-2 h-8 w-8 rounded-full z-20 shadow-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Añadir al carrito</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-[#801010] transition-colors line-clamp-2">
          {name}
        </h3>
        {/* Cambiado para renderizar el precio entero de forma más natural o formateada */}
        <p className="font-bold mt-1 text-gray-900">
          ${(price ?? 0).toLocaleString('es-CO')}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}