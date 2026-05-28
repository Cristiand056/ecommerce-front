"use client";

import { useState, useEffect, useCallback } from "react";
const promos = [
  {
    id: 1,
    name: "Whisky Buchanan's 12 Años 750ml",
    subcategory: "Whiskys",
    originalPrice: 279900,
    price: 229900,
    imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800",
    badge: "18% OFF",
    color: "#C9A84C",
  },
  {
    id: 2,
    name: "Pack x12 Aguardiente Antioqueño",
    subcategory: "Aguardientes",
    originalPrice: 514800,
    price: 490000,
    imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
    badge: "MAYORISTA",
    color: "#E63946",
  },
  {
    id: 3,
    name: "Tabla Gourmet Surtida",
    subcategory: "Delicatessen",
    originalPrice: 99900,
    price: 89900,
    imageUrl: "https://images.unsplash.com/photo-1543826173-1beeb97525d8?w=800",
    badge: "10% OFF",
    color: "#2D9B6F",
  },
  {
    id: 4,
    name: "Ron Dictador 12 Años 750ml",
    subcategory: "Rones",
    originalPrice: 189900,
    price: 159900,
    imageUrl: "https://images.unsplash.com/photo-1598908314732-07113901949e?w=800",
    badge: "16% OFF",
    color: "#8B1A1A",
  },
  {
    id: 5,
    name: "Chocolate Santander 70% x12",
    subcategory: "Dulces",
    originalPrice: 99900,
    price: 89900,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
    badge: "OFERTA",
    color: "#6B3A2A",
  },
];

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
}

function discount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

{/*Futura funcion para implementar strapi */}
/*const res = await fetch("http://localhost:1337/api/products?filters[featured][$eq]=true&populate=*");
const { data } = await res.json();*/

export default function PromoSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % promos.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + promos.length) % promos.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const promo = promos[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .promo-slider {
          --accent: ${promo.color};
          --accent-dim: ${promo.color}33;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #0f0f0f;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
          height: 420px;
        }

        .promo-bg {
          position: absolute;
          inset: 0;
          background-image: url(${promo.imageUrl});
          background-size: cover;
          background-position: center;
          filter: brightness(0.22) saturate(0.8);
          transition: opacity 0.4s ease;
          opacity: ${animating ? 0 : 1};
        }

        .promo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.92) 0%,
            rgba(0,0,0,0.7) 50%,
            rgba(0,0,0,0.1) 100%
          );
        }

        .promo-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .promo-accent-line {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--accent);
          box-shadow: 0 0 24px var(--accent);
          transition: background 0.5s, box-shadow 0.5s;
        }

        .promo-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 380px;
          height: 100%;
          align-items: center;
        }

        .promo-left {
          padding: 48px 40px 48px 52px;
          opacity: ${animating ? 0 : 1};
          transform: translateX(${animating ? (direction === "next" ? "-24px" : "24px") : "0"});
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .promo-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
          box-shadow: 0 4px 16px var(--accent-dim);
          transition: background 0.5s;
        }

        .promo-subcategory {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .promo-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 28px;
          max-width: 420px;
        }

        .promo-prices {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 32px;
        }

        .promo-price-new {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
          transition: color 0.5s;
        }

        .promo-price-old {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          text-decoration: line-through;
          margin-bottom: 4px;
        }

        .promo-saving {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-weight: 400;
        }

        .promo-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 13px 28px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: background 0.5s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 24px var(--accent-dim);
          text-decoration: none;
        }

        .promo-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px var(--accent-dim);
        }

        .promo-cta:hover svg {
          transform: translateX(4px);
        }

        .promo-cta svg {
          transition: transform 0.2s;
        }

        .promo-right {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .promo-image-wrap {
          width: 300px;
          height: 300px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
          opacity: ${animating ? 0 : 1};
          transform: ${animating ? "scale(0.92)" : "scale(1)"};
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .promo-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .promo-image-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%);
          opacity: 0.2;
          filter: blur(20px);
          transition: background 0.5s;
          pointer-events: none;
        }

        .promo-image-discount {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.1;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
          transition: background 0.5s;
          z-index: 3;
        }

        .promo-image-discount span {
          font-size: 10px;
          font-weight: 400;
          opacity: 0.85;
        }

        .promo-controls {
          position: absolute;
          bottom: 24px;
          left: 52px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 3;
        }

        .promo-dot {
          width: 6px;
          height: 6px;
          border-radius: 100px;
          background: rgba(255,255,255,0.25);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          padding: 0;
        }

        .promo-dot.active {
          background: var(--accent);
          width: 24px;
          box-shadow: 0 0 8px var(--accent);
        }

        .promo-arrows {
          position: absolute;
          bottom: 18px;
          right: 28px;
          display: flex;
          gap: 8px;
          z-index: 3;
        }

        .promo-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          backdrop-filter: blur(8px);
        }

        .promo-arrow:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }

        .promo-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: var(--accent);
          animation: progress 5s linear infinite;
          transition: background 0.5s;
        }

        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }

        @media (max-width: 700px) {
          .promo-slider { height: auto; }
          .promo-content { grid-template-columns: 1fr; }
          .promo-right { display: none; }
          .promo-left { padding: 36px 24px 60px; }
        }
      `}</style>

      <div className="promo-slider">
        <div className="promo-bg" />
        <div className="promo-overlay" />
        <div className="promo-grain" />
        <div className="promo-accent-line" />

        <div className="promo-content">
          <div className="promo-left">
            <div className="promo-badge">🔥 {promo.badge}</div>
            <p className="promo-subcategory">{promo.subcategory}</p>
            <h2 className="promo-name">{promo.name}</h2>
            <div className="promo-prices">
              <div>
                <p className="promo-price-new">{formatCOP(promo.price)}</p>
              </div>
              <div>
                <p className="promo-price-old">{formatCOP(promo.originalPrice)}</p>
                <p className="promo-saving">
                  Ahorras {formatCOP(promo.originalPrice - promo.price)}
                </p>
              </div>
            </div>
            <a href={`/catalogo/${promo.id}`} className="promo-cta">
              Ver oferta
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="promo-right">
            <div style={{ position: "relative" }}>
              <div className="promo-image-glow" />
              <div className="promo-image-wrap">
                <img src={promo.imageUrl} alt={promo.name} loading="lazy" />
              </div>
              <div className="promo-image-discount">
                -{discount(promo.originalPrice, promo.price)}%
                <span>OFF</span>
              </div>
            </div>
          </div>
        </div>

        <div className="promo-controls">
          {promos.map((_, i) => (
            <button
              key={i}
              className={`promo-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              aria-label={`Ir a promoción ${i + 1}`}
            />
          ))}
        </div>

        <div className="promo-arrows">
          <button className="promo-arrow" onClick={prev} aria-label="Anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="promo-arrow" onClick={next} aria-label="Siguiente">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div key={current} className="promo-progress" />
      </div>
    </>
  );
}