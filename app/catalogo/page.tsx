import Image from "next/image";
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

//Categorias
export default function CatalogoPage() {
  // En una implementación real, estos datos vendrían de Strapi
  const categories = [
    { name: "Licores", count: 12 },
    { name: "Cigarrillos", count: 8 },
    { name: "Dulces", count: 6 },
    { name: "Delicatessen", count: 6 },
  ];

  const filters = [
    {
      name: "SubCategoría",
      options: [
        "Whisky",
        "Vodka",
        "Cerveza",
        "Vino",
        "Aguardiente",
        "Ron",
        "Tequila",
        "Ginebra",
        "Aperitivos",
        "Cigarrillos x paquete",
        "Cohoclates",
        "Entaltados",
        "Otros"
      ]
    },
    {
      name: "Marca",
      options: [
        "Aguardiente Antioqueño", 
        "Aguardiente Néctar", 
        "Aguardiente Blanco del Valle", 
        "Ron Medellín", 
        "Ron Viejo de Caldas", 
        "Ron SantaFe", 
        "Cerveza Águila", 
        "Cerveza Club Colombia", 
        "Cerveza Poker"
      ],
    },
    {
      name: "Precio",
      options: ["Menos de 50000", "50000 - 300000", "300000 - 100000", "Más de 100000"],
    },
  ];
    const products = [
      {
        id: 1,
        name: "Aguardiente Antioqueño Tapa Azul 750ml",
        category: "Licores",
        brand: "Aguardiente Antioqueño",
        price: 45000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Guaro-Azul",
      },
      {
        id: 2,
        name: "Ron Viejo de Caldas Juan de la Cruz 5 Años 750ml",
        category: "Licores",
        brand: "Ron Viejo de Caldas",
        price: 62000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Ron-Caldas",
      },
      {
        id: 3,
        name: "Aguardiente Néctar Club Sin Azúcar 750ml",
        category: "Licores",
        brand: "Aguardiente Néctar",
        price: 42000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Nectar-Club",
      },
      {
        id: 4,
        name: "Ron Medellín Añejo 3 Años 750ml",
        category: "Licores",
        brand: "Ron Medellín",
        price: 52000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Ron-Medellin",
      },
      {
        id: 5,
        name: "Cerveza Club Colombia Dorada (6 Pack Lata)",
        category: "Licores",
        brand: "Club Colombia",
        price: 18000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Club-Dorada",
      },
      {
        id: 6,
        name: "Cerveza Águila Original (6 Pack Lata)",
        category: "Licores",
        brand: "Águila",
        price: 15000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Aguila-Original",
      },
      {
        id: 7,
        name: "Cerveza Poker (6 Pack Lata)",
        category: "Licores",
        brand: "Poker",
        price: 14500,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Cerveza-Poker",
      },
      {
        id: 8,
        name: "Whisky Johnnie Walker Black Label 750ml",
        category: "Licores",
        brand: "Johnnie Walker",
        price: 140000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Black-Label",
      },
      {
        id: 9,
        name: "Tequila José Cuervo Especial Reposado 750ml",
        category: "Licores",
        brand: "José Cuervo",
        price: 95000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Jose-Cuervo",
      },
      {
        id: 10,
        name: "Cigarrillos Mustang Paquete x20",
        category: "Cigarrillos",
        brand: "Mustang",
        price: 7500,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Mustang",
      },
      {
        id: 11,
        name: "Cigarrillos Marlboro Red Paquete x20",
        category: "Cigarrillos",
        brand: "Marlboro",
        price: 11000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Marlboro-Red",
      },
      {
        id: 12,
        name: "Aguardiente Blanco del Valle Sin Azúcar 750ml",
        category: "Licores",
        brand: "Aguardiente Blanco",
        price: 44000,
        imageSrc: "/placeholder.svg?height=300&width=300&text=Blanco-Del-Valle",
      },
    ];
return (
    <main className="flex flex-col min-h-screen">
      {/* Banner de categoría */}
      <section className="relative h-[200px] md:h-[300px]">
        <Image
          src="/placeholder.svg?height=300&width=1200&text=Licores"
          alt="Licores"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold">Licores</h1>
            <p className="mt-2 md:mt-4 text-sm md:text-base max-w-md mx-auto">
              La mejor calidad y variedad en el mercado nacional, ya sea en referencias nacionales e importadas.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container px-4 py-4 md:px-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Catálogo</span>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar con filtros - Versión escritorio */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <h2 className="text-lg font-medium mb-4">Categorías</h2>
              <ul className="space-y-2 mb-6">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/licores/${category.name.toLowerCase()}`}
                      className="flex justify-between hover:text-primary"
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
                <Accordion
                  key={filter.name}
                  type="single"
                  collapsible
                  className="mb-4"
                >
                  <AccordionItem value={filter.name}>
                    <AccordionTrigger className="text-base font-medium py-2">
                      {filter.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {filter.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`${filter.name}-${option}`} />
                            <label
                              htmlFor={`${filter.name}-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}

              <Button className="w-full mt-4">Aplicar filtros</Button>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Controles de filtrado y ordenación */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold">Productos</h2>
                <span className="ml-2 text-sm text-gray-500">
                  ({products.length} artículos)
                </span>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Botón de filtros móvil */}
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>

                {/* Selector de ordenación */}
                <Select defaultValue="relevancia">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevancia</SelectItem>
                    <SelectItem value="precio-asc">
                      Precio: menor a mayor
                    </SelectItem>
                    <SelectItem value="precio-desc">
                      Precio: mayor a menor
                    </SelectItem>
                    <SelectItem value="nuevos">Más nuevos</SelectItem>
                    <SelectItem value="populares">Más populares</SelectItem>
                  </SelectContent>
                </Select>

                {/* Selector de vista (grid/lista) */}
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden sm:flex"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  href={`/producto/licor-${product.id}`}
                />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
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