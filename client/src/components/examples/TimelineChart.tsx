import TimelineChart from "../TimelineChart";

export default function TimelineChartExample() {
  const mockData = [
    { date: "01/11", value: 75.5 },
    { date: "05/11", value: 74.8 },
    { date: "10/11", value: 74.2 },
    { date: "15/11", value: 73.9 },
    { date: "20/11", value: 73.5 },
  ];

  return (
    <TimelineChart
      title="Peso"
      data={mockData}
      unit="kg"
      color="hsl(var(--chart-1))"
    />
  );
}
