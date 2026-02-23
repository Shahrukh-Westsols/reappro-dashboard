import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Metrics {
  totalBookValue: number;
  investmentRealEstate: number;
  primaryRealEstate: number;
  aum: number;
}

async function getMetrics(): Promise<Metrics> {
  // Use absolute URL for server-side fetching
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
}

export async function MetricsCards() {
  const data = await getMetrics();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total Book Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(data.totalBookValue / 1e6).toFixed(1)}M
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Investment Real Estate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(data.investmentRealEstate / 1e6).toFixed(1)}M
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Primary Real Estate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(data.primaryRealEstate / 1e6).toFixed(1)}M
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AUM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(data.aum / 1e6).toFixed(1)}M
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
