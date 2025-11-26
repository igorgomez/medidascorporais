import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeasurementData {
  date: string;
  weight: string;
  height: string;
  chest: string;
  waist: string;
  hips: string;
  arm: string;
  thigh: string;
}

interface MeasurementFormProps {
  onSubmit: (data: MeasurementData) => void | Promise<void>;
  isSubmitting?: boolean;
}

export default function MeasurementForm({ onSubmit, isSubmitting }: MeasurementFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MeasurementData>({
    date: new Date().toISOString().slice(0, 16),
    weight: "",
    height: "",
    chest: "",
    waist: "",
    hips: "",
    arm: "",
    thigh: "",
  });

  const handleChange = (field: keyof MeasurementData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.weight && !formData.height && !formData.chest && 
        !formData.waist && !formData.hips && !formData.arm && !formData.thigh) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha pelo menos uma medida",
      });
      return;
    }

    await onSubmit(formData);
    
    // Reset form after successful submission
    setFormData({
      date: new Date().toISOString().slice(0, 16),
      weight: "",
      height: "",
      chest: "",
      waist: "",
      hips: "",
      arm: "",
      thigh: "",
    });
  };

  return (
    <Card className="w-full" data-testid="card-measurement-form">
      <CardHeader>
        <CardTitle>Registrar Nova Medição</CardTitle>
        <CardDescription>Preencha as medidas que deseja registrar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Data e Hora</Label>
            <Input
              id="date"
              type="datetime-local"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              data-testid="input-date"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="75.5"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                data-testid="input-weight"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                placeholder="175"
                value={formData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                data-testid="input-height"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chest">Peito (cm)</Label>
              <Input
                id="chest"
                type="number"
                step="0.1"
                placeholder="95"
                value={formData.chest}
                onChange={(e) => handleChange("chest", e.target.value)}
                data-testid="input-chest"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waist">Cintura (cm)</Label>
              <Input
                id="waist"
                type="number"
                step="0.1"
                placeholder="80"
                value={formData.waist}
                onChange={(e) => handleChange("waist", e.target.value)}
                data-testid="input-waist"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hips">Quadril (cm)</Label>
              <Input
                id="hips"
                type="number"
                step="0.1"
                placeholder="98"
                value={formData.hips}
                onChange={(e) => handleChange("hips", e.target.value)}
                data-testid="input-hips"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arm">Braço (cm)</Label>
              <Input
                id="arm"
                type="number"
                step="0.1"
                placeholder="35"
                value={formData.arm}
                onChange={(e) => handleChange("arm", e.target.value)}
                data-testid="input-arm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thigh">Coxa (cm)</Label>
              <Input
                id="thigh"
                type="number"
                step="0.1"
                placeholder="55"
                value={formData.thigh}
                onChange={(e) => handleChange("thigh", e.target.value)}
                data-testid="input-thigh"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            data-testid="button-submit"
            disabled={isSubmitting}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {isSubmitting ? "Salvando..." : "Registrar Medição"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
