import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Measurement {
  id: string;
  date: string;
  weight?: string;
  height?: string;
  chest?: string;
  waist?: string;
  hips?: string;
  arm?: string;
  thigh?: string;
}

interface HistoryTableProps {
  measurements: Measurement[];
  onDelete: (id: string) => void | Promise<void>;
  isDeleting?: boolean;
}

export default function HistoryTable({ measurements, onDelete, isDeleting }: HistoryTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      await onDelete(selectedId);
      setSelectedId(null);
    }
    setDeleteDialogOpen(false);
  };
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatValue = (value?: string) => {
    return value ? parseFloat(value).toFixed(1) : "-";
  };

  return (
    <Card className="w-full" data-testid="card-history">
      <CardHeader>
        <CardTitle>Histórico de Medições</CardTitle>
        <CardDescription>
          {measurements.length} {measurements.length === 1 ? "registro" : "registros"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {measurements.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhuma medição registrada ainda</p>
            <p className="text-sm mt-2">Comece adicionando sua primeira medição</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Peso (kg)</TableHead>
                  <TableHead className="text-right">Altura (cm)</TableHead>
                  <TableHead className="text-right">Peito (cm)</TableHead>
                  <TableHead className="text-right">Cintura (cm)</TableHead>
                  <TableHead className="text-right">Quadril (cm)</TableHead>
                  <TableHead className="text-right">Braço (cm)</TableHead>
                  <TableHead className="text-right">Coxa (cm)</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {measurements.map((measurement) => (
                  <TableRow key={measurement.id} data-testid={`row-measurement-${measurement.id}`}>
                    <TableCell className="font-medium">
                      {formatDate(measurement.date)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatValue(measurement.weight)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatValue(measurement.height)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatValue(measurement.chest)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatValue(measurement.waist)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatValue(measurement.hips)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatValue(measurement.arm)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatValue(measurement.thigh)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(measurement.id)}
                        data-testid={`button-delete-${measurement.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
}
