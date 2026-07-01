import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Interfaz para tipar los parámetros de la URL
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // En una fase posterior, estos datos se consultarán en Strapi usando el slug
  const product = {
    title: "Whisky Johnnie Walker Black Label 750ml",
    price: 140000,
    imageSrc: "/placeholder.svg?height=600&width=500&text=Black-Label", 
    description: "Johnnie Walker Black Label es un whisky escocés de mezcla verdaderamente icónico, reconocido como el referente para todas las demás mezclas de lujo. Creado a partir de whiskies envejecidos durante un mínimo de 12 años en los cuatro rincones de Escocia, tiene un perfil de sabor complejo, ahumado y suave a la vez.",
  };

  // formateador para pesos colombianos (COP)
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <main className="min-h-screen bg-[#FDF5E6] py-8 px-4 md:px-6">
      <div className="container max-w-5xl mx-auto">
        
        {/* Breadcrumb idéntico al de la imagen image_9c43a4.png */}
        <nav className="flex items-center text-sm font-bold text-gray-800 mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/catalogo" className="hover:underline">Catálogo</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-yellow-600 font-semibold truncate max-w-[200px] md:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Contenedor Principal de Dos Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Columna Izquierda: Imagen e Información de Seguridad */}
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

            {/* Información de Pago y Seguridad */}
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

          {/* Columna Derecha: Detalles del producto y Acciones */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {product.title}
            </h1>
            
            <p className="text-xl font-bold text-gray-900 mb-2">
              {formatPrice(product.price)}
            </p>

            <p className="text-xs text-gray-700 font-semibold mb-6">
              Tax included Shipping calculated at checkout.
            </p>

            {/* Botón Agregar a Favoritos */}
            <Button 
              variant="outline" 
              className="w-full sm:w-auto self-start bg-[#FBEED7] hover:bg-[#F3E0C3] border-none text-black font-semibold flex items-center gap-2 mb-8 rounded-full px-6"
            >
              <Heart className="h-4 w-4 text-red-600 fill-red-600" />
              Agregar a favoritos
            </Button>

            {/* Selector de Cantidad y Agregar al Carrito */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center bg-white rounded-full border border-gray-300 h-11 px-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-600">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-bold text-gray-900">1</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-600">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="flex-1 min-w-[200px] h-11 bg-[#801010] hover:bg-[#680d0d] text-white font-bold rounded-full transition-colors">
                Agregar al carrito
              </Button>
            </div>

            {/* Botón Comprar Ahora */}
            <Button className="w-full h-11 bg-[#801010] hover:bg-[#680d0d] text-white font-bold rounded-full transition-colors mb-8">
              Comprar Ahora
            </Button>

            {/* Menú Desplegable de Descripción */}
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