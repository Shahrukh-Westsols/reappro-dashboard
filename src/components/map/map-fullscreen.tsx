"use client";

import dynamic from "next/dynamic";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MapPopupCard } from "./map-popup-card";
import { Property } from "@/lib/validations/dashboard";

// Dynamically import the map for fullscreen too
const USMap = dynamic(() => import("./us-map").then((mod) => mod.USMap), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-muted animate-pulse rounded-md flex items-center justify-center">
      Loading map...
    </div>
  ),
});

interface MapFullscreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  properties: Property[];
  selectedProperty: Property | null;
  onMarkerClick: (property: Property) => void;
}

export function MapFullscreen({
  open,
  onOpenChange,
  properties,
  selectedProperty,
  onMarkerClick,
}: MapFullscreenProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Property Map</DrawerTitle>
        </DrawerHeader>
        <div className="flex h-full flex-col gap-4 p-4 lg:flex-row">
          <div className="h-[400px] flex-1 lg:h-auto">
            <USMap properties={properties} onMarkerClick={onMarkerClick} />
          </div>
          {selectedProperty && (
            <div className="w-full lg:w-80">
              <MapPopupCard property={selectedProperty} />
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
