"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix del ícono de Leaflet en Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41], // 👈 Limpiado (sin la S)
  popupAnchor: [1, -34],
});

// ── Coordenadas físicas del punto ──
const LOCATION = {
  lat: 4.7110,
  lng: -74.0721,
  name: "Distribuidora X",
  address: "Calle 80 #45-23, Bogotá",
  phone: "+57 300 123 4567",
  schedule: "Lun - Sab: 8am - 6pm",
};

export default function FindUs() {
  return (
    <section style={styles.section}>
      {/* Encabezado */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>¿Dónde estamos?</p>
        <h2 style={styles.title}>Encuéntranos aquí</h2>
        <p style={styles.subtitle}>
          Visítanos en nuestro punto físico o realiza tu pedido en línea y te llegamos a la puerta.
        </p>
      </div>

      <div style={styles.grid}>
        {/* Info de contacto */}
        <div style={styles.infoCard}>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📍</span>
            <div>
              <p style={styles.infoLabel}>Dirección</p>
              <p style={styles.infoValue}>{LOCATION.address}</p>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>🕐</span>
            <div>
              <p style={styles.infoLabel}>Horario</p>
              <p style={styles.infoValue}>{LOCATION.schedule}</p>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📞</span>
            <div>
              <p style={styles.infoLabel}>Teléfono</p>
              <p style={styles.infoValue}>{LOCATION.phone}</p>
            </div>
          </div>

          <div style={styles.divider} />

          {/* Botón para abrir en Google Maps (Etiqueta <a> arreglada) */}
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${LOCATION.lat},${LOCATION.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapsBtn}
          >
            <span>Abrir en Google Maps</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Mapa */}
        <div style={styles.mapWrap}>
          <MapContainer
            center={[LOCATION.lat, LOCATION.lng]}
            zoom={16}
            style={{ width: "100%", height: "100%", borderRadius: "16px" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />
            <Marker position={[LOCATION.lat, LOCATION.lng]} icon={icon}>
              <Popup>
                <strong>{LOCATION.name}</strong><br />
                {LOCATION.address}<br />
                {LOCATION.schedule}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "64px 24px",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#E63946",
    marginBottom: "8px",
  },
  title: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "700",
    color: "#0f0f0f",
    marginBottom: "12px",
    fontFamily: "Georgia, serif",
  },
  subtitle: {
    fontSize: "15px",
    color: "#666",
    maxWidth: "480px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "24px",
    alignItems: "stretch",
    minHeight: "420px",
  },
  infoCard: {
    background: "#0f0f0f",
    borderRadius: "16px",
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  infoItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    padding: "16px 0",
  },
  infoIcon: {
    fontSize: "20px",
    lineHeight: "1",
    marginTop: "2px",
  },
  infoLabel: {
    fontSize: "11px",
    fontWeight: "500",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "4px",
  },
  infoValue: {
    fontSize: "14px",
    color: "#fff",
    lineHeight: "1.5",
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
  },
  mapsBtn: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "#E63946",
    color: "#fff",
    padding: "13px 20px",
    borderRadius: "100px",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "opacity 0.2s",
  },
  mapWrap: {
    borderRadius: "16px",
    overflow: "hidden",
    minHeight: "420px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  },
};