// app/catalogo/page.tsx
import Link from "next/link";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/product-card";

import { getProducts, getStrapiMedia } from "@/lib/strapi";

export default async function CatalogoPage() {
  // 1. Consultamos los datos reales de Strapi v5
  const strapiResponse = await getProducts();

  console.log("📦 RAW COMPLETO:", JSON.stringify(strapiResponse, null, 2));

  // Identificamos el arreglo directo de productos (Strapi v5) o dentro de .data por si acaso
  const productsArray = Array.isArray(strapiResponse) ? strapiResponse : strapiResponse?.data || [];

  // 2. Extraemos el total de artículos dinámicamente
  const totalArticulos = strapiResponse?.meta?.pagination?.total || productsArray.length;

  // 3. Productos estáticos locales (sin URLs externas problemáticas) como plan de respaldo
  const mockProducts = [
    {
      id: 1,
      slug: "aguardiente-antioqueno-tapa-azul-750ml",
      name: "Aguardiente Antioqueño Tapa Azul 750ml",
      price: 45000,
      imageSrc: "", // Usará el fallback local en Base64 de la tarjeta
    },
    {
      id: 2,
      slug: "ron-viejo-de-caldas-juan-de-la-cross-5-anos-750ml",
      name: "Ron Viejo de Caldas Juan de la Cruz 5 Años 750ml",
      price: 62000,
      imageSrc: "", // Usará el fallback local en Base64 de la tarjeta
    }
  ];

  // 4. Mapeo limpio compatible con Strapi v5
  const finalProducts = productsArray.length > 0 
  ? productsArray.map((prod: any) => ({
      id: prod.id,
      slug: prod.slug || `producto-${prod.id}`,
      name: prod.name || "Producto sin nombre",
      price: prod.price || 0,
      imageSrc: getStrapiMedia(prod.image),
    }))
  : mockProducts;

  // Filtros fijos de interfaz estéticos
  const categories = [
    { name: "Licores", count: totalArticulos || 0 },
    { name: "Cigarrillos", count: 8 },
    { name: "Dulces", count: 6 },
    { name: "Delicatessen", count: 6 },
  ];

  const filters = [
    {
      name: "SubCategoría",
      options: ["Whisky", "Vodka", "Cerveza", "Vino", "Aguardiente", "Ron", "Tequila"],
    },
    {
      name: "Marca",
      options: ["Aguardiente Antioqueño", "Aguardiente Néctar", "Ron Viejo de Caldas", "Cerveza Club Colombia"],
    },
    {
      name: "Precio",
      options: ["Menos de 50.000", "50.000 - 300.000", "Más de 300.000"],
    },
  ];

  console.log("🆔 IDs de productos:", finalProducts.map(p => p.id));
  return (
    <main className="flex flex-col min-h-screen bg-[#FDF5E6]">
      {/* Banner de categoría elegante hecho puramente en Tailwind CSS */}
      <section className="relative h-[200px] md:h-[300px] bg-[#801010] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#680d0d] to-[#801010] opacity-95" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-52 h-52 bg-black/20 rounded-full blur-3xl" />

        <div className="relative z-10 text-center text-white p-6 max-w-xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
            Licores y Delicatessen
          </h1>
          <div className="w-16 h-1 bg-[#FDF5E6] mx-auto my-3 md:my-4 rounded" />
          <p className="text-xs md:text-sm text-[#FDF5E6]/90 font-light max-w-md mx-auto">
            La mejor calidad y variedad en licores nacionales e importados, charcutería fina y productos gourmet.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container px-4 py-4 md:px-6 mx-auto">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Inicio</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Catálogo</span>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="container px-4 py-8 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar - Filtros Escritorio */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <h2 className="text-lg font-medium mb-4">Categorías</h2>
              <ul className="space-y-2 mb-6">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/catalogo?categoria=${category.name.toLowerCase()}`}
                      className="flex justify-between hover:text-[#801010] text-sm transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500">({category.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Separator className="my-6" />

              <h2 className="text-lg font-medium mb-4">Filtros</h2>
              {filters.map((filter) => (
                <Accordion key={filter.name} type="single" collapsible className="mb-4">
                  <AccordionItem value={filter.name} className="border-none">
                    <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
                      {filter.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {filter.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox id={`${filter.name}-${option}`} />
                            <label htmlFor={`${filter.name}-${option}`} className="text-sm select-none cursor-pointer text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              <Button className="w-full mt-4 bg-[#801010] hover:bg-[#680d0d] text-white">
                Aplicar filtros
              </Button>
            </div>
          </div>

          {/* Área de Productos */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-900">Productos</h2>
                <span className="ml-2 text-sm text-gray-500">
                  ({finalProducts.length} artículos)
                </span>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="md:hidden flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filtros
                </Button>

                <Select defaultValue="relevancia">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevancia</SelectItem>
                    <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid de Productos Dinámico */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {finalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  href={`/producto/${product.slug}`}
                />
              ))}
            </div>

            {/* Paginación simple */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="bg-[#801010] text-white hover:bg-[#680d0d]">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}