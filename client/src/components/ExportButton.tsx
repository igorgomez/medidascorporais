import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  data: any[];
}

export default function ExportButton({ data }: ExportButtonProps) {
  const { toast } = useToast();

  const handleExport = () => {
    if (data.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não há dados para exportar",
      });
      return;
    }

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medidas-corporais-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso!",
      description: "Dados exportados com sucesso",
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      data-testid="button-export"
    >
      <Download className="w-4 h-4 mr-2" />
      Exportar Dados
    </Button>
  );
}
