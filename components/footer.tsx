import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-brand-red)] text-brand-cream border-t border-[var(--color-brand-red-dark)]">
      {/* Contenido principal del Footer */}
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Branding e Introducción */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold tracking-wider uppercase text-white">
              Distribuidora X
            </h2>
            <div className="w-12 h-1 bg-[#FDF5E6] rounded" />
            <p className="text-sm text-[#FDF5E6]/80 font-light leading-relaxed">
              Tu proveedor de confianza para licores nacionales e importados, cigarrillos y delicatessen de la más alta calidad.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-sm font-light text-[#FDF5E6]/85">
              <li>
                <Link href="/" className="hover:underline hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:underline hover:text-white transition-colors">
                  Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:underline hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm font-light text-[#FDF5E6]/85">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#FDF5E6]/70 flex-shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#FDF5E6]/70 flex-shrink-0" />
                <span className="break-all">contacto@distribuidorax.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#FDF5E6]/70 flex-shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Síguenos
            </h3>
            <p className="text-xs text-[#FDF5E6]/75 font-light">
              Entérate de nuestras promociones de temporada y nuevos lanzamientos.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Barra de Copyright inferior */}
      <div className="bg-[#680d0d] text-xs text-[#FDF5E6]/60 py-4 border-t border-black/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {currentYear} Distribuidora X. Todos los derechos reservados.</p>
          <p className="font-light">Diseñado bajo estándares SENA</p>
        </div>
      </div>
    </footer>
  );
}