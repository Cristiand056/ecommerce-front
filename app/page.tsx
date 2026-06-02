import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PromoSlider from "@/components/promoSlider"
import FindUs from "@/components/findUs"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-12 md:gap-16 pb-16">
      {/*Hero Section*/}
      <section className="pt-8 md:pt-12">
        <div className="container px-4 md:px-16 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Bienvenido a La <span className="bg-yellow-300 px-1">Distribuidora X</span></h1>
            <p className="mt-4 max-w-[700px] text-gray-500 text-sm">
              Tu destino confiable para productos de alta calidad. Explora nuestro catálogo en donde tenmos una amplia variedad de licores, cigarrillos nacionales e importados, donde seguro encuentra lo que necesitas y algo más.
            </p>
          </div>
        </div>
        {/*Imagen hero*/}
        <div className="container px-4 md:px-16 max-w-5xl mx-auto relative">
              <Image
                src="/placeholder.svg"
                width={800}
                height={450}
                alt="banner principal"
                className="rounded-lg object-cover w-full"
              />
        </div>
      </section>

      {/*Sección de productos en promoción*/}
      <section className="container px-4 md:px-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Productos en Promoción</h2>
        <PromoSlider />
      </section>

      {/*Sección geo-localización*/}
      <section className="container px-4 md:px-16 max-w-5xl mx-auto">
        <FindUs />
      </section>

    </main>
  );
}
