'use client'

import Link from "next/link"  
import { useState } from "react"
import { ShoppingCart, Menu, X, Package } from "lucide-react"
import { useUser, UserButton } from "@clerk/nextjs"

import { Button } from "./ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn, isLoaded } = useUser()

  console.log("🔑 Clerk state:", { isLoaded, isSignedIn }) // 👈 temporal

  return (
    <header className="w-full bg-brand-red sticky top-0 z-50 border-b border-brand-red-dark">
      <div className="container flex items-center justify-between max-w-5xl mx-auto h-16 px-4">
        
        {/* 1. Botón Hamburguesa (Móvil) - Cambia a dorado en hover */}
        <div className="flex md:hidden">
          <Button 
            variant="ghost"
            size="icon"
            className="text-brand-cream hover:bg-brand-red-dark hover:text-brand-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Abrir Menu</span>              
          </Button>
        </div>

        {/* 2. Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-brand-cream hover:text-brand-gold transition-colors">
              Distribuidora X
            </span>
          </Link>
        </div>

        {/* 3. Navegación (Escritorio) - ✨ HOVER CAMBIADO A DORADO */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-brand-cream/90 hover:text-brand-gold transition-colors">
            Inicio
          </Link>
          <Link href="/catalogo" className="text-sm font-medium text-brand-cream/90 hover:text-brand-gold transition-colors">
            Catálogo
          </Link>
          <Link href="/pedido-especial" className="text-sm font-medium text-brand-cream/90 hover:text-brand-gold transition-colors">
            Pedido Especial
          </Link>
          <Link href="/ayuda" className="text-sm font-medium text-brand-cream/90 hover:text-brand-gold transition-colors">
            Ayuda
          </Link>
        </nav>

        {/* 4. Acciones de Usuario (Derecha) */}
        <div className="flex items-center gap-3">
          
          {/* Botón "Ingresar" de Escritorio - Bordes y hover adaptados al dorado */}
          {isLoaded && !isSignedIn && (
            <Button 
              variant="outline" 
              className="hidden md:inline-flex border-brand-cream text-brand-cream hover:border-brand-gold hover:text-brand-gold hover:bg-brand-red-dark transition-all duration-200"
              asChild
            >
              <Link href="/sign-in">
                Ingresar
              </Link>
            </Button>
          )}

          {/* Mis Pedidos y Perfil */}
          {isLoaded && isSignedIn && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex text-brand-cream hover:text-brand-gold hover:bg-brand-red-dark"
                asChild
              >
                <Link href="/mi-cuenta">
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Mis Pedidos</span>
                </Link>
              </Button>
              
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full border border-brand-cream/40 hover:scale-105 transition-transform"
                  },
                }}
              />
            </div>
          )}

          {/* Carrito de Compras - Hover con texto dorado */}
          <Button 
            variant="outline" 
            size="icon" 
            className="relative rounded-full border-brand-cream/30 bg-transparent text-brand-cream hover:border-brand-gold hover:text-brand-gold hover:bg-brand-red-dark transition-all duration-200"
          >
            <ShoppingCart className="h-5 w-5 text-brand-cream group-hover:text-brand-gold" />
            <span className="sr-only">Carrito de Compras</span>
          </Button>
        </div>
      </div>

      {/* 5. Menú para dispositivos móviles */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-red border-t border-brand-red-dark p-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-5 duration-200">
          <Link 
            href="/" 
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium py-3 px-2 rounded-md hover:bg-brand-red-dark text-brand-cream hover:text-brand-gold transition-all"
          >
            Inicio
          </Link>
          <Link 
            href="/catalogo" 
            onClick={() => setIsMenuOpen(false)} 
            className="text-sm font-medium py-3 px-2 rounded-md hover:bg-brand-red-dark text-brand-cream hover:text-brand-gold transition-all"
          >
            Catálogo
          </Link>
          <Link 
            href="/pedido-especial" 
            onClick={() => setIsMenuOpen(false)} 
            className="text-sm font-medium py-3 px-2 rounded-md hover:bg-brand-red-dark text-brand-cream hover:text-brand-gold transition-all"
          >
            Pedido Especial
          </Link>
          <Link 
            href="/" 
            onClick={() => setIsMenuOpen(false)} 
            className="text-sm font-medium py-3 px-2 rounded-md hover:bg-brand-red-dark text-brand-cream hover:text-brand-gold transition-all"
          >
            Ayuda
          </Link>

          {/* Botón Móvil de Ingresar */}
          {isLoaded && !isSignedIn && (
            <Link 
              href="/sign-in" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-sm font-medium py-3 px-2 rounded-md bg-brand-cream text-brand-red hover:bg-brand-cream-dark transition-all text-center mt-2 font-semibold"
            >
              Ingresar / Registrarse
            </Link>
          )}

          {/* Botón Móvil de Pedidos */}
          {isLoaded && isSignedIn && (
            <Link 
              href="/mi-cuenta" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-sm font-medium py-3 px-2 rounded-md bg-brand-red-dark text-brand-cream hover:text-brand-gold text-center mt-2"
            >
              Ver mis pedidos
            </Link>
          )}
        </div>
      )}
    </header>
  )
}