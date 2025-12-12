import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface RadarDataPoint {
  measurement: string;
  value: number;
  fullMark: number;
}

interface RadarChartProps {
  data: RadarDataPoint[];
}

export default function RadarChart({ data }: RadarChartProps) {
  const chartConfig = {
    value: {
      label: "Última Medição",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="w-full" data-testid="card-radar-chart">
      <CardHeader>
        <CardTitle>Visão Geral - Últimas Medições</CardTitle>
        <CardDescription>Gráfico de radar com todas as medidas</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={chartConfig} className="h-[400px] md:h-[500px] w-full max-w-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart data={data}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="measurement"
                stroke="hsl(var(--foreground))"
                fontSize={12}
              />
              <PolarRadiusAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <Radar
                name="Última Medição"
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
