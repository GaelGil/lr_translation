import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { Menu } from "@mantine/core";

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

type MarkerPoint = {
  id: string;
  lat: number;
  lng: number;
};

export default function LeafletMap() {
  const [markers, setMarkers] = useState<MarkerPoint[]>([
    { id: "1", lat: 37.7702, lng: -122.4636 },
    { id: "2", lat: 37.7602, lng: -122.4273 },
  ]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (index: number) => {
    if (isOpen) {
      setHoveredId(null);
    } else {
      setIsOpen(!isOpen);
    }

    setHoveredId(String(index));
  };
  return (
    <MapContainer
      center={[37.76062130454376, -122.42187034608556]}
      zoom={13}
      // bounds={bounds}
      // maxBounds={bounds}
      // maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* <ClickHandler addPoint={(p) => setPoints((arr) => [...arr, p])} /> */}

      {markers.map((p) => (
        <>
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lng]}
            radius={6}
            pathOptions={{
              color: "#000",
              fillColor: "#ff0000",
              fillOpacity: 1,
            }}
          />
          {isOpen && hoveredId === p.id && (
            <>
              <Menu
                width={200}
                position="top-end"
                shadow="md"
                onClose={() => setIsOpen(false)}
              >
                <Menu.Target>
                  <button onClick={() => handleClick(Number(p.id))}>
                    Open menu
                  </button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item onClick={() => setIsOpen(false)}>Close</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}
        </>
      ))}
    </MapContainer>
  );
}
