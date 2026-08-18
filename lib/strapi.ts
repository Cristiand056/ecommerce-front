const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
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

export interface ProductFilters {
  page?: number;
  pageSize?: number;
  slug?: string;
  categorySlug?: string;      // 🔗 relación (foreign key)
  subcategories?: string[];   // campo texto plano, multi-select
  brands?: string[];          // campo texto plano, multi-select
  minPrice?: number;
  maxPrice?: number;
}

export async function getProducts(options?: ProductFilters) {
  const {
    slug,
    page = 1,
    pageSize = 12,
    categorySlug,
    subcategories,
    brands,
    minPrice,
    maxPrice,
  } = options || {};

  if (slug) {
    const endpoint = `products?filters[slug][$eq]=${slug}&populate=image&populate=category`;
    const res = await fetchStrapi(endpoint, { next: { revalidate: 60 } });

    if (!res) return null;
    const arr = Array.isArray(res) ? res : (res.data || []);
    return arr.length > 0 ? arr[0] : null;
  }

  const query: string[] = [
    "populate=image",
    "populate=category",
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
  ];

  // 🔗 Categoría: filtro por relación
  if (categorySlug) {
    query.push(`filters[category][slug][$eq]=${categorySlug}`);
  }

  // Subcategoría: campo texto, permite varias seleccionadas ($in)
  if (subcategories && subcategories.length > 0) {
    subcategories.forEach((val, i) => {
      query.push(`filters[subcategory][$in][${i}]=${encodeURIComponent(val)}`);
    });
  }

  // Marca: campo texto, permite varias seleccionadas ($in)
  if (brands && brands.length > 0) {
    brands.forEach((val, i) => {
      query.push(`filters[brand][$in][${i}]=${encodeURIComponent(val)}`);
    });
  }

  // Rango de precio
  if (minPrice !== undefined) query.push(`filters[price][$gte]=${minPrice}`);
  if (maxPrice !== undefined) query.push(`filters[price][$lte]=${maxPrice}`);

  const endpoint = `products?${query.join("&")}`;

  console.log("🔗 ENDPOINT GENERADO:", endpoint);
  const res = await fetchStrapi(endpoint, { next: { revalidate: 60 } });

  if (!res) return { data: [], meta: { pagination: { page: 1, pageCount: 1, total: 0 } } };

  return {
    data: Array.isArray(res.data) ? res.data : [],
    meta: res.meta || { pagination: { page: 1, pageCount: 1, total: 0 } },
  };
}

// 🔗 Categorías desde su propio content-type (relación)
export async function getCategories() {
  const res = await fetchStrapi("categories?populate=*", { next: { revalidate: 300 } });
  if (!res) return [];
  return Array.isArray(res.data) ? res.data : [];
}

export async function getFilterOptions() {
  // Traemos solo los campos que necesitamos, sin populate pesado, para máxima eficiencia
  const endpoint = "products?fields[0]=brand&fields[1]=subcategory&pagination[pageSize]=200";
  const res = await fetchStrapi(endpoint, { next: { revalidate: 300 } });

  if (!res || !Array.isArray(res.data)) {
    return { brands: [], subcategories: [] };
  }

  const brandsSet = new Set<string>();
  const subcategoriesSet = new Set<string>();

  res.data.forEach((item: any) => {
    if (item.brand) brandsSet.add(item.brand);
    if (item.subcategory) subcategoriesSet.add(item.subcategory);
  });

  return {
    brands: Array.from(brandsSet).sort(),
    subcategories: Array.from(subcategoriesSet).sort(),
  };
}

export function getStrapiMedia(media: any): string {
  if (!media) return "https://picsum.photos/300/300?random=default";
  const url = media.url;
  if (!url) return "https://picsum.photos/300/300?random=default";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

{/*Actualizar número de productos y comprobar el pago*/}
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapiAuth(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        ...options.headers,
      },
    });
    if (!response.ok) {
      const errBody = await response.text();
      console.warn(`⚠️ Strapi (auth) respondió ${response.status}: ${errBody}`); // 👈 ya lo tenías, revisa que esté
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error de conexión con Strapi (auth):`, error);
    return null;
  }
}

interface OrderItem {
  productId: number;
  productDocumentId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CreateOrderInput {
  orderNumber: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  userId: string;
  userEmail: string;
  customerNumber: string;
  shippingAddress: string;
  haveLicorTheOrder: boolean;
  CC?: string;
}

export async function createOrder(order: CreateOrderInput) {
  console.log("📝 Intentando crear orden con estos datos:", JSON.stringify(order, null, 2)); // 👈 temporal

  const result = await fetchStrapiAuth("orders", {
    method: "POST",
    body: JSON.stringify({
      data: {
        orderNumber: order.orderNumber,
        items: order.items,
        total: order.total,
        subtotal: order.subtotal,
        statusOrder: "pending",
        userId: order.userId,
        userEmail: order.userEmail,
        customerNumber: order.customerNumber,
        shippingAddress: order.shippingAddress,
        haveLicorTheOrder: order.haveLicorTheOrder,
        CC: order.CC || null,
      },
    }),
  });

  console.log("📝 Resultado de crear orden:", result); // 👈 temporal
  return result;
}

export async function getOrderByReference(orderNumber: string) {
  const res = await fetchStrapiAuth(`orders?filters[orderNumber][$eq]=${orderNumber}`);
  const data = res?.data;
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

export async function updateOrderStatus(
  orderDocumentId: string,
  statusOrder: "pending" | "processing" | "shipping" | "delivered" | "canceled",
  paymentIntentId?: string
) {
  return fetchStrapiAuth(`orders/${orderDocumentId}`, {
    method: "PUT",
    body: JSON.stringify({
      data: { statusOrder, ...(paymentIntentId ? { paymentIntentId } : {}) },
    }),
  });
}

export async function decrementProductStock(productDocumentId: string, quantitySold: number) {
  const res = await fetchStrapiAuth(`products/${productDocumentId}`);
  const currentStock = res?.data?.stock ?? 0;
  const newStock = Math.max(0, currentStock - quantitySold);
  return fetchStrapiAuth(`products/${productDocumentId}`, {
    method: "PUT",
    body: JSON.stringify({ data: { stock: newStock } }),
  });
}

export async function getOrdersByUser(userId: string) {
  const res = await fetchStrapiAuth(`orders?filters[userId][$eq]=${userId}&sort=createdAt:desc`);
  return res?.data || [];
}

{/*Promociones */}
export async function getFeaturedProducts(limit: number = 6) {
  const endpoint = `products?filters[featured][$eq]=true&filters[originalPrice][$notNull]=true&populate=image&populate=category&pagination[pageSize]=${limit}`;
  const res = await fetchStrapi(endpoint, { next: { revalidate: 120 } });

  if (!res || !Array.isArray(res.data)) return [];

  return res.data.map((prod: any) => ({
    id: prod.id,
    slug: prod.slug,
    name: prod.name || "Producto sin nombre",
    subcategory: prod.subcategory || prod.category?.name || "",
    originalPrice: prod.originalPrice,
    price: prod.price,
    imageUrl: getStrapiMedia(prod.image),
    badge: `${Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF`,
    color: CATEGORY_COLORS[prod.category?.slug] || "#801010",
  }));
}

const CATEGORY_COLORS: Record<string, string> = {
  licores: "#C9A84C",
  cigarrillos: "#8B1A1A",
  delicatessen: "#2D9B6F",
  dulces: "#6B3A2A",
};