// app/producto/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductActions } from "@/components/product-actions";
import { getProducts, getStrapiMedia } from "@/lib/strapi";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const prod = await getProducts({ slug });

  if (!prod) {
    notFound();
  }

  const product = {
    id: prod.id,
    documentId: prod.documentId,
    slug: prod.slug,
    title: prod.name || "Producto sin nombre",
    price: prod.price || 0,
    stock: prod.stock ?? 0,
    imageSrc: getStrapiMedia(prod.image),
    description: prod.description || "Sin descripción disponible.",
    categorySlug: prod.category?.slug,
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // 👇 Aquí se calcula outOfStock: es simplemente "el stock es 0 o menos"
  const outOfStock = product.stock <= 0;

  return (
    <main className="min-h-screen bg-brand-cream py-8 px-4 md:px-6">
      <div className="container max-w-5xl mx-auto">
        
        <nav className="flex items-center text-sm font-bold text-gray-800 mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/catalogo" className="hover:underline">Catálogo</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-yellow-600 font-semibold truncate max-w-[200px] md:max-w-none">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden bg-white shadow-sm border border-orange-100">
              <Image
                src={product.imageSrc}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="text-xs text-gray-900 space-y-2 leading-relaxed font-medium">
              <p className="font-bold text-sm">Pago y seguridad</p>
              <p className="font-bold">Métodos de pago</p>
              <p>
                Aceptamos todas las tarjetas de crédito, débito, transferencias bancarias y pagos en efectivo contra entrega.
                <span className="block mt-1 font-semibold tracking-wider">
                  [ VISA ] [ MASTERCARD ] [ AMEX ] [ PAYPAL ] [ APPLE PAY ] [ BITCOIN ]
                </span>
              </p>
              <p>
                Su información de pago se procesa de forma segura. No almacenamos los datos de su tarjeta de crédito ni tenemos acceso a ella.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {product.title}
            </h1>
            
            <p className="text-xl font-bold text-gray-900 mb-2">
              {formatPrice(product.price)}
            </p>

            {/* 👇 outOfStock también se usa aquí, para el mensaje de disponibilidad */}
            <p className={`text-xs font-semibold mb-6 ${outOfStock ? "text-red-600" : "text-gray-700"}`}>
              {outOfStock
                ? "Producto agotado"
                : `${product.stock} unidades disponibles · Tax included`}
            </p>

            <Button 
              variant="outline" 
              className="w-full sm:w-auto self-start bg-[#FBEED7] hover:bg-[#F3E0C3] border-none text-black font-semibold flex items-center gap-2 mb-8 rounded-full px-6"
            >
              <Heart className="h-4 w-4 text-red-600 fill-red-600" />
              Agregar a favoritos
            </Button>

            {/* 👇 y se le pasa como prop a ProductActions */}
            <ProductActions product={product} outOfStock={outOfStock} />

            <Accordion type="single" collapsible className="w-full border-t border-gray-300">
              <AccordionItem value="description" className="border-b border-gray-300">
                <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline py-4">
                  Descripción
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700 leading-relaxed pt-1 pb-4">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>

        </div>
      </div>
    </main>
  );
}