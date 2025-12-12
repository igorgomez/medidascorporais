import RadarChart from "../RadarChart";

export default function RadarChartExample() {
  const mockData = [
    { measurement: "Peso", value: 73.5, fullMark: 100 },
    { measurement: "Altura", value: 175, fullMark: 200 },
    { measurement: "Peito", value: 95, fullMark: 120 },
    { measurement: "Cintura", value: 78, fullMark: 120 },
    { measurement: "Quadril", value: 96, fullMark: 120 },
    { measurement: "Braço", value: 34, fullMark: 50 },
    { measurement: "Coxa", value: 54, fullMark: 80 },
  ];

  return <RadarChart data={mockData} />;
}
