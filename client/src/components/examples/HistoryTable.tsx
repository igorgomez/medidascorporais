import HistoryTable from "../HistoryTable";

export default function HistoryTableExample() {
  const mockMeasurements = [
    {
      id: "1",
      date: "2024-11-20T14:30",
      weight: "73.5",
      height: "175",
      chest: "95",
      waist: "78",
      hips: "96",
      arm: "34",
      thigh: "54",
    },
    {
      id: "2",
      date: "2024-11-15T10:00",
      weight: "73.9",
      height: "175",
      chest: "96",
      waist: "79",
      hips: "97",
      arm: "34.5",
      thigh: "54.5",
    },
    {
      id: "3",
      date: "2024-11-10T09:15",
      weight: "74.2",
      chest: "96.5",
      waist: "80",
      hips: "97.5",
    },
  ];

  return (
    <HistoryTable
      measurements={mockMeasurements}
      onDelete={(id) => console.log("Deletar medição:", id)}
    />
  );
}
