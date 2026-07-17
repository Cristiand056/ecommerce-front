"use client"

import { Phone } from "lucide-react"

export function FloatingContact() {
  const whatsappNumber = "573000000000" 
  const whatsappMessage = encodeURIComponent("¡Hola! Me gustaría recibir más información sobre Distribuidora X.")
  const phoneNumber = "+573000000000"

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 group relative"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.017 14.077.99 11.52.99c-5.442 0-9.863 4.373-9.867 9.801-.001 1.73.473 3.41 1.372 4.915L2.009 21.75l6.082-1.596z" />
        </svg>
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-md">
          Escríbenos
        </span>
      </a>

      <a
        href={`tel:${phoneNumber}`}
        aria-label="Llamar por teléfono"
        className="flex items-center justify-center w-14 h-14 bg-brand-red text-brand-cream rounded-full shadow-lg hover:border-brand-gold hover:text-brand-gold hover:bg-brand-red-dark border border-brand-cream/10 hover:scale-110 active:scale-95 transition-all duration-200 group relative"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-md">
          Llámanos
        </span>
      </a>
    </div>
  )
}