"use client";

import dynamic from "next/dynamic";
import { Property } from "@/lib/validations/dashboard";

// Dynamically import the map with no SSR
const USMap = dynamic(() => import("./us-map").then((mod) => mod.USMap), {
  ssr: false,
  loading: () => (
    <div className="h-[250px] w-full bg-muted animate-pulse rounded-md flex items-center justify-center">
      Loading map...
    </div>
  ),
});

interface ClientMapProps {
  properties: Property[];
  onMarkerClick: (property: Property) => void;
}

export function ClientMap({ properties, onMarkerClick }: ClientMapProps) {
  return <USMap properties={properties} onMarkerClick={onMarkerClick} />;
}
