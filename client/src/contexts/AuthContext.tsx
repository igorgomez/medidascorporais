import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginSchema = z.infer<typeof loginSchema>;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (credentials: LoginSchema) => Promise<void>;
  signUp: (credentials: LoginSchema) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state changed error:', error);
        setError('Erro ao verificar autenticação');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signIn = async ({ email, password }: LoginSchema) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Email ou senha inválidos.');
      throw err;
    }
  };

  const signUp = async ({ email, password }: LoginSchema) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Erro ao criar conta. Tente novamente.');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Erro ao fazer logout');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
