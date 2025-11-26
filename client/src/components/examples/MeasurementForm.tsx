import MeasurementForm from "../MeasurementForm";

export default function MeasurementFormExample() {
  return (
    <MeasurementForm
      onSubmit={(data) => console.log("Medição registrada:", data)}
    />
  );
}
