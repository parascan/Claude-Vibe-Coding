import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
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

// Estimated pace for each interval type (metres per minute)
const PACE_M_PER_MIN: Record<CardioInterval["type"], number> = {
  warmup: 85,
  easy: 115,
  moderate: 155,
  hard: 190,
  cooldown: 85,
};

function calcTotalDistanceKm(session: CardioSession): number {
  return session.intervals.reduce((sum, interval) => {
    return sum + (interval.minutes * PACE_M_PER_MIN[interval.type]) / 1000;
  }, 0);
}

/** Return a lat/lng a given distance and bearing from a starting point. */
function destinationPoint(
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

/** Pans the map to new coords without remounting the container. */
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

  const totalKm = calcTotalDistanceKm(session);
  const loopRadiusKm = totalKm / (2 * Math.PI);
  const outBackKm = totalKm / 2;

  const KM_TO_MI = 0.621371;
  const totalMi = totalKm * KM_TO_MI;
  const loopRadiusMi = loopRadiusKm * KM_TO_MI;
  const outBackMi = outBackKm * KM_TO_MI;

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
    const wp = destinationPoint(coords.lat, coords.lng, outBackKm, bearing);
    return `https://www.google.com/maps/dir/${coords.lat},${coords.lng}/${wp.lat},${wp.lng}/${coords.lat},${coords.lng}`;
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
          <div className="route-stat">
            <span className="route-stat-value">{outBackMi.toFixed(1)} mi</span>
            <span className="route-stat-label">Out-&-Back</span>
          </div>
          <div className="route-stat">
            <span className="route-stat-value">{loopRadiusMi.toFixed(2)} mi</span>
            <span className="route-stat-label">Loop Radius</span>
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

      {/* Map + direction tools */}
      {coords && (
        <>
          <div className="route-map-wrap">
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={14}
              style={{ height: "260px", width: "100%", borderRadius: "12px" }}
              zoomControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MapRecenter lat={coords.lat} lng={coords.lng} />
              <Marker position={[coords.lat, coords.lng]} icon={markerIcon} />
              {/* Loop route radius — smaller green circle */}
              <Circle
                center={[coords.lat, coords.lng]}
                radius={loopRadiusKm * 1000}
                pathOptions={{
                  color: "#10b981",
                  fillColor: "#10b981",
                  fillOpacity: 0.13,
                  weight: 2,
                }}
              />
              {/* Out-and-back limit — larger blue dashed circle */}
              <Circle
                center={[coords.lat, coords.lng]}
                radius={outBackKm * 1000}
                pathOptions={{
                  color: "#3b82f6",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.06,
                  weight: 2,
                  dashArray: "6 5",
                }}
              />
            </MapContainer>
          </div>

          <div className="route-legend">
            <span className="route-legend-green">● Loop route area</span>
            <span className="route-legend-blue">● Out-&-back limit</span>
          </div>

          {/* Direction picker */}
          <div className="route-direction-section">
            <p className="route-direction-label">
              Which direction will you head from your start?
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
            <a
              className="route-maps-link"
              href={buildMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              🗺 Open Route in Google Maps
            </a>
          </div>
        </>
      )}

      {!coords && (
        <div className="route-hint">
          <p>Enter your start address to see a map with suggested route circles.</p>
          <p>
            For a <strong>loop</strong>: stay within the green circle.<br />
            For <strong>out-and-back</strong>: don't go past the blue boundary.
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
