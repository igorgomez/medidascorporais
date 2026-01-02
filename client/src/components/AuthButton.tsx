import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoginForm from './LoginForm';

export default function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Até logo!',
        description: 'Logout realizado com sucesso',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao fazer logout. Tente novamente.',
      });
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled data-testid="button-auth-loading">
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSignOut}
        data-testid="button-logout"
        title="Sair"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    );
  }

  return <LoginForm />;
}
utton>
  );
}
