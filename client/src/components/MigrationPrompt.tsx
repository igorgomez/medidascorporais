import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, Loader2 } from "lucide-react";
import { useMigrateLocalStorage } from "@/hooks/useMeasurements";
import { useToast } from "@/hooks/use-toast";

export default function MigrationPrompt() {
  const [hasLocalData, setHasLocalData] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const migrateMutation = useMigrateLocalStorage();
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("measurements");
    const wasDismissed = localStorage.getItem("migration-dismissed");
    
    if (stored && !wasDismissed) {
      try {
        const data = JSON.parse(stored);
        setHasLocalData(Array.isArray(data) && data.length > 0);
      } catch (e) {
        console.error("Error checking local data:", e);
      }
    }
  }, []);

  const handleMigrate = async () => {
    try {
      const count = await migrateMutation.mutateAsync();
      toast({
        title: "Migração concluída!",
        description: `${count} medições foram transferidas para a nuvem`,
      });
      setHasLocalData(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na migração",
        description: "Não foi possível migrar os dados. Tente novamente.",
      });
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("migration-dismissed", "true");
    setDismissed(true);
  };

  if (!hasLocalData || dismissed) {
    return null;
  }

  return (
    <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20 mb-6" data-testid="card-migration-prompt">
      <CardHeader>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
          <div className="flex-1">
            <CardTitle className="text-yellow-900 dark:text-yellow-100">
              Dados locais encontrados
            </CardTitle>
            <CardDescription className="text-yellow-700 dark:text-yellow-300">
              Encontramos medições salvas no seu dispositivo
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button
          onClick={handleMigrate}
          disabled={migrateMutation.isPending}
          className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800"
          data-testid="button-migrate"
        >
          {migrateMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Migrando...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Migrar para a nuvem
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={handleDismiss}
          disabled={migrateMutation.isPending}
          className="text-yellow-900 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
          data-testid="button-dismiss-migration"
        >
          Agora não
        </Button>
      </CardContent>
    </Card>
  );
}
