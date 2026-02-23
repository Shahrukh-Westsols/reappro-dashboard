import { Property } from "@/lib/validations/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MapPopupCard({ property }: { property: Property }) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {property.imageUrl && (
          <Avatar className="h-20 w-20">
            <AvatarImage src={property.imageUrl} />
            <AvatarFallback>{property.name[0]}</AvatarFallback>
          </Avatar>
        )}
        <p>Net Worth: ${property.netWorth.toLocaleString()}</p>
        <p>IRR: {property.irr}%</p>
        <p>Total Value: ${property.totalValue.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
