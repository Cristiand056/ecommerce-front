"use client";

import { useState } from "react";
import { Send, FileText, User, Phone, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomOrderForm() {
  // 1. Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    productDetails: "",
    quantity: "1",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 2. Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Función al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Aquí conectarías con tu API del SENA en el futuro.
    // Por ahora simulamos un envío exitoso con un retraso de 1 segundo:
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Opcional: Podrías redirigir los datos a WhatsApp de una vez
    /*
    const message = `Hola Distribuidora X! Mi nombre es ${formData.name}. Deseo un pedido especial: ${formData.productDetails} (Cantidad: ${formData.quantity}). Entrega en: ${formData.address}. Teléfono: ${formData.phone}.`;
    window.open(`https://api.whatsapp.com/send?phone=573001234567&text=${encodeURIComponent(message)}`, "_blank");
    */
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-xl mx-auto">
        <span className="text-4xl">🎉</span>
        <h3 className="text-xl font-bold text-green-800 mt-2">¡Pedido Especial Recibido!</h3>
        <p className="text-green-600 text-sm mt-1">
          Nos pondremos en contacto contigo al número {formData.phone} para confirmar los precios y la entrega de tu solicitud.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>Hacer otro pedido</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm max-w-2xl mx-auto flex flex-col gap-6">
      
      {/* Sección: Datos de Contacto */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
          <User className="h-4 w-4" /> Datos de Contacto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Teléfono / WhatsApp</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ej. 300 123 4567"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Sección: Ubicación */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
          <MapPin className="h-4 w-4" /> Entrega
        </h3>
        <label className="text-xs font-medium text-gray-700">Dirección de Envío (Bogotá)</label>
        <input
          type="text"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          placeholder="Ej. Calle 80 #45-23, Unilago"
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Sección: Detalles del Pedido */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
          <Package className="h-4 w-4" /> Detalles del Pedido Especial
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">¿Qué licores, cigarrillos o marcas necesitas?</label>
            <textarea
              name="productDetails"
              required
              rows={3}
              value={formData.productDetails}
              onChange={handleChange}
              placeholder="Ej. Necesito 3 cajas de Aguardiente Antioqueño Tapa Azul y 5 paquetes de Marlboro Red para un evento empresarial..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Cantidad estimada de productos o combos</label>
            <select
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="1">1 a 5 unidades / botellas</option>
              <option value="6">6 a 12 unidades (Media Caja)</option>
              <option value="12">12 a 24 unidades (Caja Completa)</option>
              <option value="mayor">Más de 2 cajas (Distribución al por mayor)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Notas adicionales / Especificaciones (Opcional)</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ej. Por favor enviar los licores fríos / Empacar para regalo."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Botón de Envío */}
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold flex items-center justify-center gap-2"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? "Enviando solicitud..." : "Enviar Cotización de Pedido"}
      </Button>

    </form>
  );
}