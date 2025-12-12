import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
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

  const signIn = async () => {
    try {
      setError(null);
      await signInAnonymously(auth);
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Erro ao fazer login');
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
