"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientMap } from "@/components/map/client-map";
import { MapFullscreen } from "@/components/map/map-fullscreen";
import { useState } from "react";
import { client } from "@/lib/api-client";
import { Property } from "@/lib/validations/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function MapWidget() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => client<{ properties: Property[] }>("/properties"),
  });

  const handleMarkerClick = (prop: Property) => {
    setSelectedProperty(prop);
    setFullscreenOpen(true);
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Property Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientMap
            properties={data?.properties || []}
            onMarkerClick={handleMarkerClick}
          />
        </CardContent>
      </Card>
      <MapFullscreen
        open={fullscreenOpen}
        onOpenChange={setFullscreenOpen}
        properties={data?.properties || []}
        selectedProperty={selectedProperty}
        onMarkerClick={handleMarkerClick}
      />
    </>
  );
}
