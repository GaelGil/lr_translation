import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

type Point = { id: string; lat: number; lng: number };

// fix default icon (Leaflet default icons need config)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

function ClickHandler({ addPoint }: { addPoint: (p: Point) => void }) {
  useMapEvents({
    click(e) {
      addPoint({
        id: crypto.randomUUID(),
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export default function LeafletMap() {
  const [points, setPoints] = useState<Point[]>([]);
  // const bounds: [[number, number], [number, number]] = [
  //   [30.7749, -122.4194], // SW corner
  //   [20.7749, -112.4194], // NE corner
  // ];

  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={13}
      // bounds={bounds}
      // maxBounds={bounds}
      // maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ClickHandler addPoint={(p) => setPoints((arr) => [...arr, p])} />

      {points.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} />
      ))}
    </MapContainer>
  );
}
