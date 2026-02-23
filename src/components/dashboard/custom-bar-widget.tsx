import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBarChart } from "@/components/charts/custom-bar-chart";

export function CustomBarWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real Estate Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <CustomBarChart />
      </CardContent>
    </Card>
  );
}
