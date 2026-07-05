// lib/strapi.ts

// 1. URL base de Strapi
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

/**
 * 🛠️ Función auxiliar (DEBE ir primero para que getProducts la pueda usar)
 */
async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.warn(`⚠️ Strapi respondió con estado: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error de conexión con Strapi en el endpoint [${endpoint}]:`, error);
    return null;
  }
}

/**
 * 📦 Obtiene productos de Strapi v5
 */
export async function getProducts(slug?: string) {
  const endpoint = slug 
    ? `products?filters[slug][$eq]=${slug}&populate=image` 
    : "products?populate=image&pagination[pageSize]=100&pagination[page]=1";

  const res = await fetchStrapi(endpoint, {
    next: { revalidate: 60 }, 
  });

  if (!res) return slug ? null : [];

  const productsArray = Array.isArray(res) ? res : (res.data || []);

  if (slug) {
    return Array.isArray(productsArray) && productsArray.length > 0 ? productsArray[0] : null;
  }

  return Array.isArray(productsArray) ? productsArray : [];
}

export function getStrapiMedia(media: any): string {
  if (!media) return "https://picsum.photos/300/300?random=default";
  const url = media.url;
  if (!url) return "https://picsum.photos/300/300?random=default";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}