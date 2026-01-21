import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Box, Text } from "@mantine/core";
import { FaCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Papa from "papaparse";

type MarkerPoint = {
  id: string;
  lat: number;
  lng: number;
  city: string;
  type_: string;
  url: string;
  live: boolean;
};

export default function LeafletMap() {
  const [markers, setMarkers] = useState<MarkerPoint[]>([]);
  useEffect(() => {
    Papa.parse<MarkerPoint>("data.csv", {
      download: true,
      header: true,
      complete: (res: { data: MarkerPoint[] }) => setMarkers(res.data),
    });
  }, []);
  console.log(markers);

  return (
    <MapContainer
      center={[37.76062130454376, -122.42187034608556]}
      zoom={13}
      // bounds={bounds}
      // maxBounds={bounds}
      // maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution="© OpenStreetMap, © CARTO"
        subdomains="abcd"
      />

      {markers.length > 0 && (
        <>
          {markers.map((p) => (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={6}
              pathOptions={{
                color: "#000",
                fillColor: "#ff0000",
                fillOpacity: 1,
              }}
            >
              <Popup>
                <Box>
                  <Text>City: {p.city}</Text>
                  <Text>Type: {p.type_}</Text>
                  <Text>
                    Live: <FaCircle color={p.live ? "green" : "red"} />
                  </Text>
                  <iframe
                    src={`https://www.youtube.com/embed/${p.url}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </Box>
              </Popup>
            </CircleMarker>
          ))}{" "}
        </>
      )}
    </MapContainer>
  );
}
