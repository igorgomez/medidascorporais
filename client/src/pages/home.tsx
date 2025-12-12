import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, TrendingUp, Activity, Clock, Loader2, AlertCircle } from "lucide-react";
import MeasurementForm from "@/components/MeasurementForm";
import TimelineChart from "@/components/TimelineChart";
import RadarChart from "@/components/RadarChart";
import HistoryTable from "@/components/HistoryTable";
import ThemeToggle from "@/components/ThemeToggle";
import ExportButton from "@/components/ExportButton";
import AuthButton from "@/components/AuthButton";
import MigrationPrompt from "@/components/MigrationPrompt";
import { useAuth } from "@/contexts/AuthContext";
import { useMeasurements, useCreateMeasurement, useDeleteMeasurement } from "@/hooks/useMeasurements";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Measurement } from "@/lib/measurementService";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { data: measurements = [], isLoading: measurementsLoading } = useMeasurements();
  const createMutation = useCreateMeasurement();
  const deleteMutation = useDeleteMeasurement();
  const { toast } = useToast();

  const handleSubmit = async (data: Omit<Measurement, "id" | "userId" | "createdAt">) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Você precisa estar logado para registrar medições",
      });
      return;
    }

    try {
      await createMutation.mutateAsync(data);
      toast({
        title: "Sucesso!",
        description: "Medição registrada com sucesso",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao registrar medição. Tente novamente.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Sucesso!",
        description: "Medição deletada com sucesso",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao deletar medição. Tente novamente.",
      });
    }
  };

  const prepareTimelineData = (field: keyof Measurement) => {
    // Measurements already come sorted by date DESC from Firestore
    // Sort by date ASC for chronological timeline, then take last 10
    const sorted = measurements
      .filter((m) => m[field])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sorted
      .slice(-10)
      .map((m) => ({
        date: new Date(m.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        }),
        value: parseFloat(m[field] as string),
      }));
  };

  const prepareRadarData = () => {
    if (measurements.length === 0) return [];

    const latest = measurements[0];
    const data = [];

    if (latest.weight)
      data.push({
        measurement: "Peso",
        value: parseFloat(latest.weight),
        fullMark: 100,
      });
    if (latest.height)
      data.push({
        measurement: "Altura",
        value: parseFloat(latest.height),
        fullMark: 200,
      });
    if (latest.chest)
      data.push({
        measurement: "Peito",
        value: parseFloat(latest.chest),
        fullMark: 120,
      });
    if (latest.waist)
      data.push({
        measurement: "Cintura",
        value: parseFloat(latest.waist),
        fullMark: 120,
      });
    if (latest.hips)
      data.push({
        measurement: "Quadril",
        value: parseFloat(latest.hips),
        fullMark: 120,
      });
    if (latest.arm)
      data.push({
        measurement: "Braço",
        value: parseFloat(latest.arm),
        fullMark: 50,
      });
    if (latest.thigh)
      data.push({
        measurement: "Coxa",
        value: parseFloat(latest.thigh),
        fullMark: 80,
      });

    return data;
  };

  const weightData = prepareTimelineData("weight");
  const heightData = prepareTimelineData("height");
  const chestData = prepareTimelineData("chest");
  const waistData = prepareTimelineData("waist");
  const hipsData = prepareTimelineData("hips");
  const armData = prepareTimelineData("arm");
  const thighData = prepareTimelineData("thigh");
  const radarData = prepareRadarData();

  // Show loading state while authenticating
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Medidas Corporais</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="container max-w-2xl mx-auto px-4 py-16">
          <Card className="text-center" data-testid="card-login-prompt">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Bem-vindo!</CardTitle>
              <CardDescription>
                Faça login para começar a registrar suas medidas corporais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthButton />
              <p className="text-sm text-muted-foreground mt-4">
                Seus dados serão salvos com segurança na nuvem
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Medidas Corporais</h1>
          </div>
          <div className="flex items-center gap-2">
            <ExportButton data={measurements} />
            <AuthButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
        <MigrationPrompt />
        
        <Tabs defaultValue="registrar" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="registrar" data-testid="tab-registrar">
              <PlusCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Registrar</span>
            </TabsTrigger>
            <TabsTrigger value="graficos" data-testid="tab-graficos">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Gráficos</span>
            </TabsTrigger>
            <TabsTrigger value="radar" data-testid="tab-radar">
              <Activity className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Radar</span>
            </TabsTrigger>
            <TabsTrigger value="historico" data-testid="tab-historico">
              <Clock className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Histórico</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrar" className="mt-0">
            <MeasurementForm 
              onSubmit={handleSubmit}
              isSubmitting={createMutation.isPending}
            />
          </TabsContent>

          <TabsContent value="graficos" className="mt-0">
            {measurementsLoading ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-muted-foreground">Carregando medições...</p>
              </div>
            ) : measurements.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Nenhuma medição registrada</p>
                <p className="text-sm mt-2">
                  Adicione suas primeiras medições para ver os gráficos de evolução
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {weightData.length > 0 && (
                  <TimelineChart
                    title="Peso"
                    data={weightData}
                    unit="kg"
                    color="hsl(var(--chart-1))"
                  />
                )}
                {heightData.length > 0 && (
                  <TimelineChart
                    title="Altura"
                    data={heightData}
                    unit="cm"
                    color="hsl(var(--chart-2))"
                  />
                )}
                {chestData.length > 0 && (
                  <TimelineChart
                    title="Peito"
                    data={chestData}
                    unit="cm"
                    color="hsl(var(--chart-3))"
                  />
                )}
                {waistData.length > 0 && (
                  <TimelineChart
                    title="Cintura"
                    data={waistData}
                    unit="cm"
                    color="hsl(var(--chart-4))"
                  />
                )}
                {hipsData.length > 0 && (
                  <TimelineChart
                    title="Quadril"
                    data={hipsData}
                    unit="cm"
                    color="hsl(var(--chart-5))"
                  />
                )}
                {armData.length > 0 && (
                  <TimelineChart
                    title="Braço"
                    data={armData}
                    unit="cm"
                    color="hsl(var(--chart-1))"
                  />
                )}
                {thighData.length > 0 && (
                  <TimelineChart
                    title="Coxa"
                    data={thighData}
                    unit="cm"
                    color="hsl(var(--chart-2))"
                  />
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="radar" className="mt-0">
            {measurementsLoading ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-muted-foreground">Carregando medições...</p>
              </div>
            ) : radarData.length > 0 ? (
              <RadarChart data={radarData} />
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Nenhuma medição registrada</p>
                <p className="text-sm mt-2">
                  Adicione suas medições para visualizar o gráfico de radar
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="historico" className="mt-0">
            {measurementsLoading ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-muted-foreground">Carregando medições...</p>
              </div>
            ) : (
              <HistoryTable 
                measurements={measurements} 
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
