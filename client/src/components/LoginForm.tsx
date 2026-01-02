import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, loginSchema } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onTabChange = (value: string) => {
    setActiveTab(value);
    reset(); // Reset form when switching tabs
  };
  
  const onSubmit = async (data: LoginSchema) => {
    try {
      if (activeTab === 'login') {
        await signIn(data);
        toast({
          title: 'Bem-vindo!',
          description: 'Login realizado com sucesso',
        });
      } else {
        await signUp(data);
        toast({
          title: 'Conta criada!',
          description: 'Sua conta foi criada com sucesso.',
        });
      }
      setOpen(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description:
          error.message || 'Ocorreu um erro. Por favor, tente novamente.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" data-testid="button-login-signup">
          <LogIn className="w-4 h-4 mr-2" />
          Entrar ou Registrar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TabsContent value="login">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email-login" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email-login"
                    type="email"
                    className="col-span-3"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="col-span-4 text-red-500 text-xs text-right">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password-login" className="text-right">
                    Senha
                  </Label>
                  <Input
                    id="password-login"
                    type="password"
                    className="col-span-3"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="col-span-4 text-red-500 text-xs text-right">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <DialogHeader>
                <DialogTitle>Registrar</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email-register" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email-register"
                    type="email"
                    className="col-span-3"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="col-span-4 text-red-500 text-xs text-right">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password-register" className="text-right">
                    Senha
                  </Label>
                  <Input
                    id="password-register"
                    type="password"
                    className="col-span-3"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="col-span-4 text-red-500 text-xs text-right">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            <DialogFooter>
              <Button type="submit">
                {activeTab === 'login' ? 'Entrar' : 'Registrar'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
