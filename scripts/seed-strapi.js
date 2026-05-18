/**
 * Script de Seed para Strapi - Distribuidora X
 * Licores, Cigarrillos, Delicatessen, Dulces y Otros
 *
 * USO:
 * 1. Crear API Token en Strapi: Settings > API Tokens > Create new API Token (Full access)
 * 2. Copiar el token y pegarlo en STRAPI_API_TOKEN
 * 3. Ejecutar: node scripts/seed-strapi.js
 * 4. Para limpiar antes de sembrar: node scripts/seed-strapi.js --clean
 */

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// ==================== CATEGORÍAS ====================
const categories = [
  {
    name: "Licores",
    slug: "licores",
    description: "Amplio portafolio de licores nacionales e importados: aguardientes, rones, whiskys, vodkas, vinos, cervezas y más.",
  },
  {
    name: "Cigarrillos",
    slug: "cigarrillos",
    description: "Principales marcas de cigarrillos nacionales e importados: Marlboro, Piel Roja, Lucky Strike, Mustang y más.",
  },
  {
    name: "Delicatessen",
    slug: "delicatessen",
    description: "Productos gourmet e importados: quesos, embutidos, conservas, aceitunas, charcutería y más.",
  },
  {
    name: "Dulces",
    slug: "dulces",
    description: "Confitería nacional e importada: chocolatinas, gomitas, chicles, caramelos, chupetas y más.",
  },
  {
    name: "Otros",
    slug: "otros",
    description: "Productos complementarios: snacks, bebidas no alcohólicas, encendedores, accesorios y más.",
  },
];

// ==================== PRODUCTOS ====================
const products = [

  // ===================== LICORES — AGUARDIENTES (6) =====================
  {
    name: "Aguardiente Antioqueño Sin Azúcar 750ml",
    slug: "aguardiente-antioqueno-sin-azucar-750",
    description: "Aguardiente Antioqueño sin azúcar, botella de 750ml. El más vendido de Colombia.",
    price: 42900,
    originalPrice: null,
    category: "licores",
    subcategory: "Aguardientes",
    brand: "Aguardiente Antioqueño",
    stock: 120,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },
  {
    name: "Aguardiente Antioqueño Tradicional 750ml",
    slug: "aguardiente-antioqueno-tradicional-750",
    description: "Aguardiente Antioqueño tradicional con azúcar, botella de 750ml.",
    price: 41900,
    originalPrice: null,
    category: "licores",
    subcategory: "Aguardientes",
    brand: "Aguardiente Antioqueño",
    stock: 100,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },
  {
    name: "Aguardiente Nectar Naranja 750ml",
    slug: "aguardiente-nectar-naranja-750",
    description: "Aguardiente Néctar sabor naranja, botella de 750ml. Suave y afrutado.",
    price: 39900,
    originalPrice: null,
    category: "licores",
    subcategory: "Aguardientes",
    brand: "Néctar",
    stock: 80,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },
  {
    name: "Aguardiente Cristal 750ml",
    slug: "aguardiente-cristal-750",
    description: "Aguardiente Cristal, tradicional del Valle del Cauca. Botella 750ml.",
    price: 38900,
    originalPrice: null,
    category: "licores",
    subcategory: "Aguardientes",
    brand: "Cristal",
    stock: 90,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },
  {
    name: "Aguardiente Antioqueño 375ml",
    slug: "aguardiente-antioqueno-375",
    description: "Aguardiente Antioqueño sin azúcar, media botella 375ml.",
    price: 22900,
    originalPrice: null,
    category: "licores",
    subcategory: "Aguardientes",
    brand: "Aguardiente Antioqueño",
    stock: 150,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },
  {
    name: "Pack x12 Aguardiente Antioqueño 750ml",
    slug: "pack-12-aguardiente-antioqueno-750",
    description: "Caja por 12 unidades de Aguardiente Antioqueño sin azúcar 750ml. Precio mayorista.",
    price: 490000,
    originalPrice: 514800,
    category: "licores",
    subcategory: "Aguardientes",
    brand: "Aguardiente Antioqueño",
    stock: 30,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },

  // ===================== LICORES — RONES (5) =====================
  {
    name: "Ron Medellín Añejo 750ml",
    slug: "ron-medellin-anejo-750",
    description: "Ron Medellín Añejo 8 años, botella 750ml. El ron insignia de Colombia.",
    price: 68900,
    originalPrice: null,
    category: "licores",
    subcategory: "Rones",
    brand: "Ron Medellín",
    stock: 70,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1598908314732-07113901949e?w=800",
  },
  {
    name: "Ron Viejo de Caldas 750ml",
    slug: "ron-viejo-caldas-750",
    description: "Ron Viejo de Caldas, suave y aromático. Botella 750ml.",
    price: 52900,
    originalPrice: null,
    category: "licores",
    subcategory: "Rones",
    brand: "Viejo de Caldas",
    stock: 80,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1598908314732-07113901949e?w=800",
  },
  {
    name: "Ron Bacardí Carta Blanca 750ml",
    slug: "ron-bacardi-carta-blanca-750",
    description: "Ron Bacardí Carta Blanca importado, ideal para cócteles. Botella 750ml.",
    price: 89900,
    originalPrice: null,
    category: "licores",
    subcategory: "Rones",
    brand: "Bacardí",
    stock: 50,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1598908314732-07113901949e?w=800",
  },
  {
    name: "Ron Dictador 12 Años 750ml",
    slug: "ron-dictador-12-anos-750",
    description: "Ron premium colombiano Dictador 12 años. Botella 750ml.",
    price: 159900,
    originalPrice: null,
    category: "licores",
    subcategory: "Rones",
    brand: "Dictador",
    stock: 30,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1598908314732-07113901949e?w=800",
  },
  {
    name: "Ron Medellín Extra Añejo 750ml",
    slug: "ron-medellin-extra-anejo-750",
    description: "Ron Medellín Extra Añejo 12 años, la referencia premium de la casa. 750ml.",
    price: 119900,
    originalPrice: null,
    category: "licores",
    subcategory: "Rones",
    brand: "Ron Medellín",
    stock: 40,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1598908314732-07113901949e?w=800",
  },

  // ===================== LICORES — WHISKYS (5) =====================
  {
    name: "Whisky Old Parr 750ml",
    slug: "whisky-old-parr-750",
    description: "Old Parr Blended Scotch Whisky 12 años. Botella 750ml.",
    price: 189900,
    originalPrice: null,
    category: "licores",
    subcategory: "Whiskys",
    brand: "Old Parr",
    stock: 40,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800",
  },
  {
    name: "Whisky Johnnie Walker Red Label 750ml",
    slug: "whisky-jw-red-label-750",
    description: "Johnnie Walker Red Label, el blended más vendido del mundo. 750ml.",
    price: 129900,
    originalPrice: null,
    category: "licores",
    subcategory: "Whiskys",
    brand: "Johnnie Walker",
    stock: 50,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800",
  },
  {
    name: "Whisky Johnnie Walker Black Label 750ml",
    slug: "whisky-jw-black-label-750",
    description: "Johnnie Walker Black Label 12 años. Perfil ahumado y elegante. 750ml.",
    price: 219900,
    originalPrice: null,
    category: "licores",
    subcategory: "Whiskys",
    brand: "Johnnie Walker",
    stock: 30,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800",
  },
  {
    name: "Whisky Jack Daniel's 750ml",
    slug: "whisky-jack-daniels-750",
    description: "Jack Daniel's Old No.7 Tennessee Whiskey. Botella 750ml.",
    price: 199900,
    originalPrice: null,
    category: "licores",
    subcategory: "Whiskys",
    brand: "Jack Daniel's",
    stock: 35,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800",
  },
  {
    name: "Whisky Buchanan's 12 Años 750ml",
    slug: "whisky-buchanans-12-750",
    description: "Buchanan's Deluxe 12 años, símbolo de estatus en Colombia. 750ml.",
    price: 229900,
    originalPrice: null,
    category: "licores",
    subcategory: "Whiskys",
    brand: "Buchanan's",
    stock: 25,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800",
  },

  // ===================== LICORES — VODKAS Y OTROS (4) =====================
  {
    name: "Vodka Absolut Original 750ml",
    slug: "vodka-absolut-original-750",
    description: "Vodka Absolut sueco, el más reconocido a nivel mundial. 750ml.",
    price: 109900,
    originalPrice: null,
    category: "licores",
    subcategory: "Vodkas",
    brand: "Absolut",
    stock: 40,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800",
  },
  {
    name: "Tequila José Cuervo Especial 750ml",
    slug: "tequila-jose-cuervo-750",
    description: "Tequila José Cuervo Gold, referencia esencial. Botella 750ml.",
    price: 129900,
    originalPrice: null,
    category: "licores",
    subcategory: "Tequilas",
    brand: "José Cuervo",
    stock: 30,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
  },
  {
    name: "Vino Santa Helena Cabernet 750ml",
    slug: "vino-santa-helena-cabernet-750",
    description: "Vino tinto chileno Santa Helena Cabernet Sauvignon. Botella 750ml.",
    price: 49900,
    originalPrice: null,
    category: "licores",
    subcategory: "Vinos",
    brand: "Santa Helena",
    stock: 60,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
  },
  {
    name: "Cerveza Club Colombia x6 330ml",
    slug: "cerveza-club-colombia-x6",
    description: "Six pack de Club Colombia Dorada 330ml. La cerveza premium colombiana.",
    price: 28900,
    originalPrice: null,
    category: "licores",
    subcategory: "Cervezas",
    brand: "Club Colombia",
    stock: 200,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800",
  },

  // ===================== CIGARRILLOS — NACIONALES (5) =====================
  {
    name: "Cigarrillos Piel Roja x20",
    slug: "cigarrillos-piel-roja-x20",
    description: "Cajetilla Piel Roja con filtro, 20 unidades. El clásico colombiano.",
    price: 18900,
    originalPrice: null,
    category: "cigarrillos",
    subcategory: "Nacionales",
    brand: "Piel Roja",
    stock: 200,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },
  {
    name: "Cigarrillos Mustang x20",
    slug: "cigarrillos-mustang-x20",
    description: "Cajetilla Mustang con filtro, 20 unidades. Suave y accesible.",
    price: 16900,
    originalPrice: null,
    category: "cigarrillos",
    subcategory: "Nacionales",
    brand: "Mustang",
    stock: 180,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },
  {
    name: "Cigarrillos Delta x20",
    slug: "cigarrillos-delta-x20",
    description: "Cajetilla Delta con filtro, 20 unidades.",
    price: 15900,
    originalPrice: null,
    category: "cigarrillos",
    subcategory: "Nacionales",
    brand: "Delta",
    stock: 150,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },
  {
    name: "Pack x10 Piel Roja x20",
    slug: "pack-10-piel-roja-x20",
    description: "Cartoneta de 10 cajetillas Piel Roja con filtro. Precio mayorista.",
    price: 179000,
    originalPrice: 189000,
    category: "cigarrillos",
    subcategory: "Nacionales",
    brand: "Piel Roja",
    stock: 50,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },
  {
    name: "Pack x10 Mustang x20",
    slug: "pack-10-mustang-x20",
    description: "Cartoneta de 10 cajetillas Mustang. Precio mayorista.",
    price: 159000,
    originalPrice: 169000,
    category: "cigarrillos",
    subcategory: "Nacionales",
    brand: "Mustang",
    stock: 50,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },

  // ===================== CIGARRILLOS — IMPORTADOS (4) =====================
  {
    name: "Marlboro Rojo x20",
    slug: "marlboro-rojo-x20",
    description: "Cajetilla Marlboro Rojo, 20 unidades. La marca más reconocida del mundo.",
    price: 24900,
    originalPrice: null,
    category: "cigarrillos",
    subcategory: "Importados",
    brand: "Marlboro",
    stock: 150,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },
  {
    name: "Marlboro Gold x20",
    slug: "marlboro-gold-x20",
    description: "Cajetilla Marlboro Gold suave, 20 unidades.",
    price: 24900,
    originalPrice: null,
    category: "cigarrillos",
    subcategory: "Importados",
    brand: "Marlboro",
    stock: 130,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },
  {
    name: "Lucky Strike Original x20",
    slug: "lucky-strike-original-x20",
    description: "Cajetilla Lucky Strike Original, 20 unidades.",
    price: 22900,
    originalPrice: null,
    category: "cigarrillos",
    subcategory: "Importados",
    brand: "Lucky Strike",
    stock: 100,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },
  {
    name: "Camel Azul x20",
    slug: "camel-azul-x20",
    description: "Cajetilla Camel Blue suave, 20 unidades.",
    price: 23900,
    originalPrice: null,
    category: "cigarrillos",
    subcategory: "Importados",
    brand: "Camel",
    stock: 90,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1516486079817-b6f4df9f3eef?w=800",
  },

  // ===================== DELICATESSEN — QUESOS Y EMBUTIDOS (6) =====================
  {
    name: "Queso Manchego 250g",
    slug: "queso-manchego-250g",
    description: "Queso manchego importado curado, porción 250g. Ideal para tablas.",
    price: 34900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Quesos",
    brand: "García Baquero",
    stock: 40,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=800",
  },
  {
    name: "Queso Brie 125g",
    slug: "queso-brie-125g",
    description: "Queso Brie francés cremoso, porción 125g.",
    price: 28900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Quesos",
    brand: "Président",
    stock: 35,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=800",
  },
  {
    name: "Salami Italiano 150g",
    slug: "salami-italiano-150g",
    description: "Salami italiano importado en láminas, 150g.",
    price: 22900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Embutidos",
    brand: "Fiorucci",
    stock: 45,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1621963530476-b1d87b0e3d4e?w=800",
  },
  {
    name: "Jamón Serrano 100g",
    slug: "jamon-serrano-100g",
    description: "Jamón serrano español en láminas, 100g.",
    price: 24900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Embutidos",
    brand: "Navidul",
    stock: 40,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1621963530476-b1d87b0e3d4e?w=800",
  },
  {
    name: "Aceitunas Negras 290g",
    slug: "aceitunas-negras-290g",
    description: "Aceitunas negras importadas sin hueso en conserva, frasco 290g.",
    price: 18900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Conservas",
    brand: "Carbonell",
    stock: 55,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1605720375054-d3e1ada18a62?w=800",
  },
  {
    name: "Tabla Gourmet Surtida",
    slug: "tabla-gourmet-surtida",
    description: "Kit tabla gourmet: queso manchego, salami, aceitunas y galletas. Ideal para regalo.",
    price: 89900,
    originalPrice: 99900,
    category: "delicatessen",
    subcategory: "Kits",
    brand: "Distribuidora X",
    stock: 20,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1543826173-1beeb97525d8?w=800",
  },

  // ===================== DELICATESSEN — CONSERVAS Y SNACKS GOURMET (4) =====================
  {
    name: "Atún Gourmet en Aceite de Oliva 80g",
    slug: "atun-gourmet-aceite-oliva-80g",
    description: "Atún importado en aceite de oliva extra virgen, lata 80g.",
    price: 12900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Conservas",
    brand: "Calvo",
    stock: 80,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1605720375054-d3e1ada18a62?w=800",
  },
  {
    name: "Foie Gras de Pato 130g",
    slug: "foie-gras-pato-130g",
    description: "Paté de foie gras importado, lata 130g.",
    price: 49900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Conservas",
    brand: "Rougié",
    stock: 25,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1605720375054-d3e1ada18a62?w=800",
  },
  {
    name: "Alcaparras en Vinagre 225g",
    slug: "alcaparras-vinagre-225g",
    description: "Alcaparras importadas en vinagre, frasco 225g.",
    price: 14900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Conservas",
    brand: "Fragata",
    stock: 60,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1605720375054-d3e1ada18a62?w=800",
  },
  {
    name: "Galletas Cracker Gourmet x100g",
    slug: "galletas-cracker-gourmet-100g",
    description: "Galletas cracker importadas para acompañar tablas de quesos, 100g.",
    price: 11900,
    originalPrice: null,
    category: "delicatessen",
    subcategory: "Snacks Gourmet",
    brand: "Carr's",
    stock: 70,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
  },

  // ===================== DULCES — CHOCOLATINAS (6) =====================
  {
    name: "Chocolatina Jet x24",
    slug: "chocolatina-jet-x24",
    description: "Caja de 24 unidades de Chocolatina Jet. El clásico colombiano.",
    price: 28900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Chocolatinas",
    brand: "Jet",
    stock: 100,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
  },
  {
    name: "Manicho x24",
    slug: "manicho-x24",
    description: "Caja de 24 unidades de Manicho, maní cubierto de chocolate.",
    price: 24900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Chocolatinas",
    brand: "Manicho",
    stock: 90,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
  },
  {
    name: "Chocolate Santander 70% x12",
    slug: "chocolate-santander-70-x12",
    description: "Caja de 12 tabletas Chocolate Santander 70% cacao. Premium colombiano.",
    price: 89900,
    originalPrice: 99900,
    category: "dulces",
    subcategory: "Chocolatinas",
    brand: "Santander",
    stock: 40,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
  },
  {
    name: "Snickers x24",
    slug: "snickers-x24",
    description: "Display de 24 unidades de Snickers importado.",
    price: 59900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Chocolatinas",
    brand: "Mars",
    stock: 70,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
  },
  {
    name: "Kit Kat x24",
    slug: "kit-kat-x24",
    description: "Display de 24 unidades de Kit Kat importado.",
    price: 54900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Chocolatinas",
    brand: "Nestlé",
    stock: 60,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
  },
  {
    name: "Ferrero Rocher x16",
    slug: "ferrero-rocher-x16",
    description: "Caja de 16 unidades de Ferrero Rocher. Ideal para regalo.",
    price: 79900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Chocolatinas",
    brand: "Ferrero",
    stock: 35,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
  },

  // ===================== DULCES — GOMITAS Y CARAMELOS (5) =====================
  {
    name: "Bon Bon Bum x24",
    slug: "bon-bon-bum-x24",
    description: "Caja de 24 chupetas Bon Bon Bum surtidas. El clásico colombiano.",
    price: 19900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Caramelos",
    brand: "Colombina",
    stock: 120,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
  },
  {
    name: "Gomitas Haribo x10",
    slug: "gomitas-haribo-x10",
    description: "Display de 10 bolsas de Gomitas Haribo Goldbears 100g.",
    price: 34900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Gomitas",
    brand: "Haribo",
    stock: 80,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
  },
  {
    name: "Mentas Halls x20",
    slug: "mentas-halls-x20",
    description: "Display de 20 paquetes de Halls mentol azul.",
    price: 22900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Caramelos",
    brand: "Halls",
    stock: 100,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
  },
  {
    name: "Chicles Trident x18",
    slug: "chicles-trident-x18",
    description: "Display de 18 paquetes de chicles Trident menta.",
    price: 26900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Chicles",
    brand: "Trident",
    stock: 90,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
  },
  {
    name: "Masmelos Jet x12",
    slug: "masmelos-jet-x12",
    description: "Caja de 12 paquetes de Masmelos Jet. Suaves y esponjosos.",
    price: 18900,
    originalPrice: null,
    category: "dulces",
    subcategory: "Caramelos",
    brand: "Jet",
    stock: 80,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
  },

  // ===================== OTROS — SNACKS Y BEBIDAS (5) =====================
  {
    name: "Papas Margarita x30",
    slug: "papas-margarita-x30",
    description: "Display de 30 paquetes de Papas Margarita sal 30g.",
    price: 39900,
    originalPrice: null,
    category: "otros",
    subcategory: "Snacks",
    brand: "Margarita",
    stock: 100,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800",
  },
  {
    name: "Maní Salado x24",
    slug: "mani-salado-x24",
    description: "Display de 24 paquetes de maní salado tostado 50g.",
    price: 29900,
    originalPrice: null,
    category: "otros",
    subcategory: "Snacks",
    brand: "El Dorado",
    stock: 90,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800",
  },
  {
    name: "Agua Crystal x12 600ml",
    slug: "agua-crystal-x12-600ml",
    description: "Paquete de 12 botellas de Agua Crystal 600ml.",
    price: 19900,
    originalPrice: null,
    category: "otros",
    subcategory: "Bebidas",
    brand: "Crystal",
    stock: 150,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1550505095-81378a674395?w=800",
  },
  {
    name: "Encendedores BIC x50",
    slug: "encendedores-bic-x50",
    description: "Caja de 50 encendedores BIC mini surtidos.",
    price: 89900,
    originalPrice: null,
    category: "otros",
    subcategory: "Accesorios",
    brand: "BIC",
    stock: 60,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800",
  },
  {
    name: "Cerillos El Rey x50",
    slug: "cerillos-el-rey-x50",
    description: "Caja de 50 cajas de fósforos El Rey.",
    price: 29900,
    originalPrice: null,
    category: "otros",
    subcategory: "Accesorios",
    brand: "El Rey",
    stock: 80,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800",
  },
];

// ==================== FUNCIONES ====================

async function fetchAPI(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error.message);
    throw error;
  }
}

async function uploadImageFromUrl(imageUrl, fileName) {
    const FALLBACK_URL = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800";
    try {
        console.log(`   📷 Descargando imagen: ${fileName}`);
        let imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
        console.log(`   ⚠️  URL original falló (${imageResponse.status}), usando respaldo...`);
      imageResponse = await fetch(FALLBACK_URL);
    }
    
    if (!imageResponse.ok) throw new Error(`No se pudo descargar la imagen`);

    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    const boundary = "----formdata-" + Date.now();
    const fileName_ = `${fileName}.jpg`;
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${fileName_}"\r\nContent-Type: image/jpeg\r\n\r\n`;
    const footer = `\r\n--${boundary}--\r\n`;
    const body = Buffer.concat([Buffer.from(header, "utf-8"), buffer, Buffer.from(footer, "utf-8")]);

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
      body,
    });

    if (!response.ok) throw new Error(`Error subiendo imagen: ${await response.text()}`);
    const data = await response.json();
    console.log(`   ✅ Imagen subida: ${fileName}`);
    return data[0]?.id;
  } catch (error) {
    console.error(`   ❌ Error con imagen ${fileName}: ${error.message}`);
    return null;
  }
}

async function createCategory(category) {
  try {
    const response = await fetchAPI("/categories", {
      method: "POST",
      body: JSON.stringify({ data: category }),
    });
    console.log(`✅ Categoría creada: ${category.name}`);
    return response.data;
  } catch (error) {
    console.log(`⚠️  Buscando categoría existente: ${category.name}`);
    const existing = await fetchAPI(`/categories?filters[slug][$eq]=${category.slug}`);
    if (existing.data && existing.data.length > 0) {
      console.log(`📦 Usando categoría existente: ${category.name}`);
      return existing.data[0];
    }
    throw error;
  }
}

async function createProduct(product, categoryId, imageId) {
  const productData = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    subcategory: product.subcategory,
    stock: product.stock,
    featured: product.featured,
    category: categoryId,
    brand: product.brand,
  };
  if (imageId) productData.image = imageId;

  try {
    const response = await fetchAPI("/products", {
      method: "POST",
      body: JSON.stringify({ data: productData }),
    });
    const priceFormatted = new Intl.NumberFormat("es-CO", {
      style: "currency", currency: "COP", minimumFractionDigits: 0,
    }).format(product.price);
    console.log(`✅ Producto creado: ${product.name} - ${priceFormatted}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creando producto "${product.name}": ${error.message}`);
    return null;
  }
}

async function clearExistingData() {
  console.log("\n🧹 Limpiando datos existentes...");
  try {
    const existingProducts = await fetchAPI("/products?pagination[pageSize]=200");
    if (existingProducts.data?.length > 0) {
      for (const p of existingProducts.data) {
        await fetchAPI(`/products/${p.id}`, { method: "DELETE" });
      }
      console.log(`   Eliminados ${existingProducts.data.length} productos`);
    }
    const existingCategories = await fetchAPI("/categories?pagination[pageSize]=50");
    if (existingCategories.data?.length > 0) {
      for (const c of existingCategories.data) {
        await fetchAPI(`/categories/${c.id}`, { method: "DELETE" });
      }
      console.log(`   Eliminadas ${existingCategories.data.length} categorías`);
    }
  } catch (error) {
    console.log("   No se pudo limpiar (puede que no existan datos aún)");
  }
}

async function seed() {
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║     🥃 SEED DE DATOS - DISTRIBUIDORA X                       ║");
  console.log("║     Licores · Cigarrillos · Delicatessen · Dulces · Otros    ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");
  console.log(`🔗 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔑 Token configurado: ${STRAPI_API_TOKEN !== "TU_API_TOKEN_AQUI" ? "Sí ✅" : "No ❌ (configurar!)"}\n`);

  if (STRAPI_API_TOKEN === "TU_API_TOKEN_AQUI") {
    console.error("❌ ERROR: Debes configurar el STRAPI_API_TOKEN");
    console.log("\nPasos:");
    console.log("1. Abre Strapi Admin: http://localhost:1337/admin");
    console.log("2. Ve a Settings > API Tokens > Create new API Token");
    console.log('3. Nombre: "Seed Script", Tipo: "Full access"');
    console.log("4. Copia el token y agrégalo como variable de entorno:");
    console.log("   STRAPI_API_TOKEN=tu_token node scripts/seed-strapi.js");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  if (args.includes("--clean")) await clearExistingData();

  // 1. Crear categorías
  console.log("\n📁 CREANDO CATEGORÍAS...");
  console.log("─".repeat(55));
  const categoryMap = {};
  for (const cat of categories) {
    const created = await createCategory(cat);
    if (created) categoryMap[cat.slug] = created.id;
  }

  // 2. Crear productos
  console.log("\n📦 CREANDO PRODUCTOS...");
  console.log("─".repeat(55));
  let created = 0;
  let failed = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] ${product.name}`);
    const imageId = await uploadImageFromUrl(product.imageUrl, product.slug);
    const categoryId = categoryMap[product.category];
    const result = await createProduct(product, categoryId, imageId);
    result ? created++ : failed++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Resumen
  console.log("\n" + "═".repeat(55));
  console.log("📊 RESUMEN DISTRIBUIDORA X");
  console.log("═".repeat(55));
  console.log(`✅ Categorías creadas: ${Object.keys(categoryMap).length}`);
  console.log(`✅ Productos creados:  ${created}`);
  if (failed > 0) console.log(`❌ Productos fallidos: ${failed}`);

  console.log("\n📈 PRODUCTOS POR CATEGORÍA:");
  const stats = {};
  products.forEach((p) => { stats[p.category] = (stats[p.category] || 0) + 1; });
  const labels = { licores: "🥃 Licores", cigarrillos: "🚬 Cigarrillos", delicatessen: "🧀 Delicatessen", dulces: "🍬 Dulces", otros: "📦 Otros" };
  Object.entries(stats).forEach(([cat, count]) => {
    console.log(`   ${labels[cat] || cat}: ${count} productos`);
  });

  console.log("\n✨ ¡Seed completado exitosamente!");
  console.log("\nPróximos pasos:");
  console.log("1. Verifica en Strapi Admin: http://localhost:1337/admin");
  console.log("2. Configura permisos públicos para Category y Product");
  console.log("3. Prueba la API:");
  console.log("   curl http://localhost:1337/api/products?populate=*");
  console.log("   curl http://localhost:1337/api/categories");
}

seed().catch((error) => {
  console.error("\n❌ Error fatal:", error);
  process.exit(1);
});
