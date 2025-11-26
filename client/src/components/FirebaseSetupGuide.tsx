import { AlertCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FirebaseSetupGuide() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <CardTitle>Configuração Firebase Necessária</CardTitle>
          </div>
          <CardDescription>
            A aplicação requer configuração do Firebase para funcionar
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Como Configurar
            </h3>
            <ol className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-[24px]">1</span>
                <div>
                  <p className="font-medium">Abra o arquivo <code className="bg-muted px-2 py-1 rounded text-sm">.env.local</code></p>
                  <p className="text-sm text-muted-foreground">Na raiz do projeto</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-[24px]">2</span>
                <div>
                  <p className="font-medium">Preencha com suas credenciais Firebase</p>
                  <p className="text-sm text-muted-foreground">Siga o guia em <code className="bg-muted px-2 py-1 rounded text-sm">FIREBASE_SETUP.md</code></p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-[24px]">3</span>
                <div>
                  <p className="font-medium">Salve e reinicie o servidor</p>
                  <p className="text-sm text-muted-foreground">A aplicação será recarregada automaticamente</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="font-semibold text-sm">Variáveis necessárias:</p>
            <div className="text-xs font-mono space-y-1 text-muted-foreground">
              <div>VITE_FIREBASE_API_KEY</div>
              <div>VITE_FIREBASE_AUTH_DOMAIN</div>
              <div>VITE_FIREBASE_PROJECT_ID</div>
              <div>VITE_FIREBASE_STORAGE_BUCKET</div>
              <div>VITE_FIREBASE_MESSAGING_SENDER_ID</div>
              <div>VITE_FIREBASE_APP_ID</div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Não tem um projeto Firebase?</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Siga o guia completo em <code className="bg-muted px-2 py-1 rounded">FIREBASE_SETUP.md</code> para criar um novo projeto Firebase gratuitamente.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Recarregar
            </Button>
            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" size="sm">
                Ir para Firebase Console
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
