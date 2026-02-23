"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Property } from "@/lib/validations/dashboard";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface USMapProps {
  properties: Property[];
  onMarkerClick: (property: Property) => void;
}

export function USMap({ properties, onMarkerClick }: USMapProps) {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {properties.map(
        (prop) =>
          prop.latitude &&
          prop.longitude && (
            <Marker
              key={prop.id}
              position={[prop.latitude, prop.longitude]}
              eventHandlers={{
                click: () => onMarkerClick(prop),
              }}
            >
              <Tooltip>{prop.name}</Tooltip>
            </Marker>
          ),
      )}
    </MapContainer>
  );
}
