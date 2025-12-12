import ExportButton from "../ExportButton";

export default function ExportButtonExample() {
  const mockData = [
    { id: "1", date: "2024-11-20", weight: "73.5" },
    { id: "2", date: "2024-11-15", weight: "73.9" },
  ];

  return <ExportButton data={mockData} />;
}
