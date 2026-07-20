// app/catalogo/page.tsx
import Link from "next/link";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import { CatalogFilters } from "@/components/catalog-filters";
import { getProducts, getStrapiMedia, getCategories, getFilterOptions } from "@/lib/strapi";

const PAGE_SIZE = 12;



const PRICE_RANGES: Record<string, { min: number; max?: number }> = {
  "Menos de 50.000": { min: 0, max: 50000 },
  "50.000 - 300.000": { min: 50000, max: 300000 },
  "Más de 300.000": { min: 300000, max: undefined },
};



export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    categoria?: string;
    subcategoria?: string;
    marca?: string;
    precio?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const subcategories = params.subcategoria?.split(",").filter(Boolean);
  const brands = params.marca?.split(",").filter(Boolean);
  const priceRange = params.precio ? PRICE_RANGES[params.precio] : undefined;

  const [strapiResponse, categoriesData, filterOptions] = await Promise.all([
    getProducts({
      page: currentPage,
      pageSize: PAGE_SIZE,
      categorySlug: params.categoria,
      subcategories,
      brands,
      minPrice: priceRange?.min,
      maxPrice: priceRange?.max,
    }),
    getCategories(),
    getFilterOptions(),
  ]);

  const productsArray = strapiResponse?.data || [];
  const pagination = strapiResponse?.meta?.pagination || { page: 1, pageCount: 1, total: 0 };

  const categories = categoriesData.map((cat: any) => ({
    slug: cat.slug,
    name: cat.name,
  }));

  const finalProducts = productsArray.map((prod: any) => ({
    id: prod.id,
    slug: prod.slug || `producto-${prod.id}`,
    name: prod.name || "Producto sin nombre",
    price: prod.price || 0,
    imageSrc: getStrapiMedia(prod.image),
  }));

  const totalPages = pagination.pageCount || 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const buildPageHref = (page: number) => {
    const p = new URLSearchParams();
    if (params.categoria) p.set("categoria", params.categoria);
    if (params.subcategoria) p.set("subcategoria", params.subcategoria);
    if (params.marca) p.set("marca", params.marca);
    if (params.precio) p.set("precio", params.precio);
    p.set("page", String(page));
    return `/catalogo?${p.toString()}`;
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#FDF5E6]">
      <section className="relative h-[200px] md:h-[300px] flex items-center justify-center overflow-hidden bg-brand-red">
        <Image
          src={getStrapiMedia(finalProducts[0].images?.url || "/placeholder.jpg")}
          alt="Fondo de licores y delicatessen"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-brand-red-dark/50 to-brand-red/95 z-10" />

        <div className="relative z-20 text-center text-brand-cream p-6 max-w-xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
            Licores, Cigarrillos, Delicatessen y Más
          </h1>
          <div className="w-16 h-1 bg-brand-cream mx-auto my-3 md:my-4 rounded" />
        </div>
      </section>

      <div className="container px-4 py-4 md:px-6 mx-auto">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Inicio</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Catálogo</span>
        </nav>
      </div>

      <div className="container px-4 py-8 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 flex-shrink-0">
            <CatalogFilters
              categories={categories}
              subcategoryOptions={filterOptions.subcategories}
              brandOptions={filterOptions.brands}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-900">Productos</h2>
                <span className="ml-2 text-sm text-gray-500">({pagination.total} artículos)</span>
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

            {finalProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                No se encontraron productos con estos filtros.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {finalProducts.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imageSrc={product.imageSrc}
                    href={`/producto/${product.slug}`}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-1">
                  {pageNumbers.map((num) => (
                    <Link key={num} href={buildPageHref(num)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className={num === currentPage ? "bg-[#801010] text-white hover:bg-[#680d0d]" : ""}
                      >
                        {num}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}