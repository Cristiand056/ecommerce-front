// components/catalog-filters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface CategoryOption {
  slug: string;
  name: string;
  count?: number;
}

interface CatalogFiltersProps {
  categories: CategoryOption[];
  subcategoryOptions: string[];
  brandOptions: string[];
}

const PRICE_RANGES = [
  { label: "Menos de 50.000", min: 0, max: 50000 },
  { label: "50.000 - 300.000", min: 50000, max: 300000 },
  { label: "Más de 300.000", min: 300000, max: undefined },
];

export function CatalogFilters({ categories, subcategoryOptions, brandOptions }: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoria") || "";
  const currentSubcategorias = searchParams.get("subcategoria")?.split(",").filter(Boolean) || [];
  const currentMarcas = searchParams.get("marca")?.split(",").filter(Boolean) || [];
  const currentPrecio = searchParams.get("precio") || "";

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    params.delete("page"); // reinicia paginación al cambiar filtros
    router.push(`/catalogo?${params.toString()}`);
  };

  const toggleMulti = (key: "subcategoria" | "marca", value: string, current: string[]) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateParams({ [key]: next.length > 0 ? next.join(",") : null });
  };

  const togglePrecio = (rangeLabel: string) => {
    updateParams({ precio: currentPrecio === rangeLabel ? null : rangeLabel });
  };

  const clearAll = () => {
    router.push("/catalogo");
  };

  return (
    <div className="sticky top-20">
      <h2 className="text-lg font-medium mb-4">Categorías</h2>
      <ul className="space-y-2 mb-6">
        <li>
          <Link
            href="/catalogo"
            className={`flex justify-between hover:text-[#801010] text-sm transition-colors ${
              !currentCategory ? "text-[#801010] font-semibold" : ""
            }`}
          >
            Todas
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <button
              onClick={() =>
                updateParams({ categoria: currentCategory === category.slug ? null : category.slug })
              }
              className={`flex justify-between w-full text-left hover:text-[#801010] text-sm transition-colors ${
                currentCategory === category.slug ? "text-[#801010] font-semibold" : ""
              }`}
            >
              <span>{category.name}</span>
              {category.count !== undefined && (
                <span className="text-gray-500">({category.count})</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <Separator className="my-6" />

      <h2 className="text-lg font-medium mb-4">Filtros</h2>

      <Accordion type="single" collapsible className="mb-4" defaultValue="subcategoria">
        <AccordionItem value="subcategoria" className="border-none">
          <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
            SubCategoría
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {subcategoryOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sub-${option}`}
                    checked={currentSubcategorias.includes(option)}
                    onCheckedChange={() => toggleMulti("subcategoria", option, currentSubcategorias)}
                  />
                  <label
                    htmlFor={`sub-${option}`}
                    className="text-sm select-none cursor-pointer text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="marca" className="border-none">
          <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
            Marca
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {brandOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${option}`}
                    checked={currentMarcas.includes(option)}
                    onCheckedChange={() => toggleMulti("marca", option, currentMarcas)}
                  />
                  <label
                    htmlFor={`brand-${option}`}
                    className="text-sm select-none cursor-pointer text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="precio" className="border-none">
          <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
            Precio
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {PRICE_RANGES.map((range) => (
                <div key={range.label} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${range.label}`}
                    checked={currentPrecio === range.label}
                    onCheckedChange={() => togglePrecio(range.label)}
                  />
                  <label
                    htmlFor={`price-${range.label}`}
                    className="text-sm select-none cursor-pointer text-gray-700"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        variant="outline"
        className="w-full mt-2"
        onClick={clearAll}
      >
        Limpiar filtros
      </Button>
    </div>
  );
}