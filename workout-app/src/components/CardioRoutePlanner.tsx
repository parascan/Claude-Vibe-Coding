import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CardioSession, CardioInterval } from "../lib/cardioGenerator";

// Fix Leaflet's broken default marker paths when bundled
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PACE_M_PER_MIN: Record<CardioInterval["type"], number> = {
  warmup: 85,
  easy: 115,
  moderate: 155,
  hard: 190,
  cooldown: 85,
};

const KM_TO_MI = 0.621371;

function calcTotalDistanceKm(session: CardioSession): number {
  return session.intervals.reduce(
    (sum, interval) => sum + (interval.minutes * PACE_M_PER_MIN[interval.type]) / 1000,
    0
  );
}

/** Returns a lat/lng a given distance (km) and bearing (deg) from a point. */
function dest(
  lat: number,
  lng: number,
  distanceKm: number,
  bearingDeg: number
): { lat: number; lng: number } {
  const R = 6371;
  const d = distanceKm / R;
  const φ1 = (lat * Math.PI) / 180;
  const λ1 = (lng * Math.PI) / 180;
  const θ = (bearingDeg * Math.PI) / 180;
  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(d) + Math.cos(φ1) * Math.sin(d) * Math.cos(θ)
  );
  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(θ) * Math.sin(d) * Math.cos(φ1),
      Math.cos(d) - Math.sin(φ1) * Math.sin(φ2)
    );
  return { lat: (φ2 * 180) / Math.PI, lng: (λ2 * 180) / Math.PI };
}

/**
 * Builds the 4 corners of a square loop starting from `start`,
 * heading in `bearing` first, then turning right.
 * Each side = totalKm / 4.
 */
function buildLoopCorners(
  start: { lat: number; lng: number },
  totalKm: number,
  bearing: number
): { lat: number; lng: number }[] {
  const side = totalKm / 4;
  const wp1 = dest(start.lat, start.lng, side, bearing);
  const wp2 = dest(wp1.lat, wp1.lng, side, bearing + 90);
  const wp3 = dest(wp2.lat, wp2.lng, side, bearing + 180);
  return [start, wp1, wp2, wp3];
}

function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng, map]);
  return null;
}

const BEARINGS = [
  { label: "N", deg: 0 },
  { label: "NE", deg: 45 },
  { label: "E", deg: 90 },
  { label: "SE", deg: 135 },
  { label: "S", deg: 180 },
  { label: "SW", deg: 225 },
  { label: "W", deg: 270 },
  { label: "NW", deg: 315 },
];

type RouteType = "loop" | "out-back";

interface Props {
  session: CardioSession;
  onStart: () => void;
  onBack: () => void;
}

export function CardioRoutePlanner({ session, onStart, onBack }: Props) {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [bearing, setBearing] = useState(0);
  const [routeType, setRouteType] = useState<RouteType>("loop");

  const totalKm = calcTotalDistanceKm(session);
  const outBackKm = totalKm / 2;
  const sideKm = totalKm / 4;
  const totalMi = totalKm * KM_TO_MI;
  const outBackMi = outBackKm * KM_TO_MI;
  const sideMi = sideKm * KM_TO_MI;

  const loopCorners = coords ? buildLoopCorners(coords, totalKm, bearing) : [];
  const loopPositions = loopCorners.map((p) => [p.lat, p.lng] as [number, number]);

  async function searchAddress() {
    if (!address.trim()) return;
    setSearching(true);
    setSearchError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        { headers: { "User-Agent": "WorkoutPlannerApp/1.0" } }
      );
      const data = await res.json();
      if (!data.length) {
        setSearchError("Address not found. Try a more specific search.");
      } else {
        setCoords({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      }
    } catch {
      setSearchError("Search failed. Check your connection and try again.");
    } finally {
      setSearching(false);
    }
  }

  function buildMapsUrl(): string {
    if (!coords) return "#";
    if (routeType === "out-back") {
      const wp = dest(coords.lat, coords.lng, outBackKm, bearing);
      return `https://www.google.com/maps/dir/${coords.lat},${coords.lng}/${wp.lat},${wp.lng}/${coords.lat},${coords.lng}`;
    }
    // Square loop: start → WP1 → WP2 → WP3 → start
    const [, wp1, wp2, wp3] = loopCorners;
    return `https://www.google.com/maps/dir/${coords.lat},${coords.lng}/${wp1.lat},${wp1.lng}/${wp2.lat},${wp2.lng}/${wp3.lat},${wp3.lng}/${coords.lat},${coords.lng}`;
  }

  return (
    <div className="route-planner">
      {/* Header */}
      <div className="workout-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h2>Plan Your Route</h2>
      </div>

      {/* Route type toggle */}
      <div className="route-type-toggle">
        <button
          className={`route-type-btn ${routeType === "loop" ? "active" : ""}`}
          onClick={() => setRouteType("loop")}
        >
          🔄 Loop
        </button>
        <button
          className={`route-type-btn ${routeType === "out-back" ? "active" : ""}`}
          onClick={() => setRouteType("out-back")}
        >
          ↔ Out &amp; Back
        </button>
      </div>

      {/* Distance summary */}
      <div className="route-distance-card">
        <div className="route-activity-label">
          {session.activity.emoji} {session.activity.name} · {session.totalMinutes} min
        </div>
        <div className="route-stats-grid">
          <div className="route-stat">
            <span className="route-stat-value">{totalMi.toFixed(1)} mi</span>
            <span className="route-stat-label">Total Distance</span>
          </div>
          {routeType === "loop" ? (
            <div className="route-stat">
              <span className="route-stat-value">{sideMi.toFixed(2)} mi</span>
              <span className="route-stat-label">Each Side</span>
            </div>
          ) : (
            <div className="route-stat">
              <span className="route-stat-value">{outBackMi.toFixed(1)} mi</span>
              <span className="route-stat-label">Turnaround</span>
            </div>
          )}
          <div className="route-stat">
            <span className="route-stat-value">{bearing}°</span>
            <span className="route-stat-label">Direction</span>
          </div>
        </div>
      </div>

      {/* Address search */}
      <div className="route-search-row">
        <input
          className="route-address-input"
          type="text"
          placeholder="Enter your start address…"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchAddress()}
        />
        <button
          className="route-search-btn"
          onClick={searchAddress}
          disabled={searching || !address.trim()}
        >
          {searching ? "…" : "Find"}
        </button>
      </div>

      {searchError && <p className="route-error">{searchError}</p>}

      {/* Map */}
      {coords && (
        <>
          <div className="route-map-wrap">
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={14}
              style={{ height: "260px", width: "100%", borderRadius: "12px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MapRecenter lat={coords.lat} lng={coords.lng} />
              <Marker position={[coords.lat, coords.lng]} icon={markerIcon} />

              {routeType === "loop" && loopPositions.length === 4 && (
                <Polygon
                  positions={loopPositions}
                  pathOptions={{
                    color: "#10b981",
                    fillColor: "#10b981",
                    fillOpacity: 0.15,
                    weight: 3,
                  }}
                />
              )}

              {routeType === "out-back" && (
                <Circle
                  center={[coords.lat, coords.lng]}
                  radius={outBackKm * 1000}
                  pathOptions={{
                    color: "#3b82f6",
                    fillColor: "#3b82f6",
                    fillOpacity: 0.08,
                    weight: 2,
                    dashArray: "6 5",
                  }}
                />
              )}
            </MapContainer>
          </div>

          <div className="route-legend">
            {routeType === "loop" ? (
              <span className="route-legend-green">● Square loop route ({(sideKm * 1000 * KM_TO_MI * 5280).toFixed(0)} ft each side)</span>
            ) : (
              <span className="route-legend-blue">● Turn around at the edge of the circle</span>
            )}
          </div>
        </>
      )}

      {/* Direction picker */}
      <div className="route-direction-section">
        <p className="route-direction-label">
          {routeType === "loop"
            ? "Which direction does your loop head first?"
            : "Which direction will you run out?"}
        </p>
        <div className="route-bearing-grid">
          {BEARINGS.map((b) => (
            <button
              key={b.deg}
              className={`route-bearing-btn ${bearing === b.deg ? "active" : ""}`}
              onClick={() => setBearing(b.deg)}
            >
              {b.label}
            </button>
          ))}
        </div>
        {coords && (
          <a
            className="route-maps-link"
            href={buildMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            🗺 Open Route in Google Maps
          </a>
        )}
      </div>

      {!coords && (
        <div className="route-hint">
          <p>Enter your start address to see your route on the map.</p>
          <p>
            <strong>Loop</strong>: runs a square circuit, ending back where you started.<br />
            <strong>Out &amp; Back</strong>: run out to the turnaround point, then return.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="route-actions">
        <button className="start-workout-btn" onClick={onStart}>
          ▶ Start Timer
        </button>
        <button className="route-skip-btn" onClick={onStart}>
          Skip map — start anyway
        </button>
      </div>
    </div>
  );
}
