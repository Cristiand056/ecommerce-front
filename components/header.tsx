'use client'
/*para evitar que la paguína se recarge cuando el usuario de click un link  */
import Link from "next/link"  
import { useState } from "react"
import { ShoppingCart, Menu, X, User, Package } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Header(){
    "Logica del negocio"
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full p-4 items">
            <div className="container flex items-center justify-between max-w-5xl mx_auto">
                <div className="flex md:hidden">
                    <Button 
                    variant="ghost"
                    size="icon"
                    onClick = {() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir Menu</span>              
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl">Distribuidora X</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items center space-x-8">
                    <Link href="/" className="text-sm font-medium transition-color hover:text-primary">Inicio</Link>
                    <Link href="/" className="text-sm font-medium transition-color hover:text-primary">Catálogo</Link>
                    <Link href="/" className="text-sm font-medium transition-color hover:text-primary">Pedido Especial</Link>
                    <Link href="/" className="text-sm font-medium transition-color hover:text-primary">Ayuda</Link>
                    <Link href="/" className="text-sm font-medium transition-color hover:text-primary">Ingresar/Registarse</Link>

                    <Button variant="outline" size="icon" className="relative rounded-full">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Carrito de Compras </span>
                    </Button>
                </nav>
            </div>
        </header>
    )
}
