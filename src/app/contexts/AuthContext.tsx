import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '@/utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // If this is an OAuth sign in, check if we need to link accounts
        if (event === 'SIGNED_IN' && session.user.app_metadata?.provider !== 'email') {
          try {
            await checkAndLinkAccount(session.user);
          } catch (err) {
            console.error('Error checking account linking:', err);
          }
        }
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAndLinkAccount = async (oauthUser: SupabaseUser) => {
    // Only run this for OAuth providers (not email/password)
    const provider = oauthUser.app_metadata?.provider;
    if (!provider || provider === 'email') return;

    const email = oauthUser.email;
    if (!email) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c2dab185/auth/link-account`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            provider,
            providerId: oauthUser.id,
            providerData: {
              avatar_url: oauthUser.user_metadata?.avatar_url,
              picture: oauthUser.user_metadata?.picture,
            }
          }),
        }
      );

      const data = await response.json();
      
      if (data.linked) {
        console.log('Account linked successfully:', data.message);
      } else if (data.alreadyLinked) {
        console.log('Account already linked:', data.message);
      }
    } catch (err) {
      console.error('Failed to check account linking:', err);
    }
  };

  const mapSupabaseUser = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email || 'User',
      picture: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture,
    };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/knowledge-base`,
      },
    });
    
    if (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    // Call server endpoint to create user with auto-confirmed email
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-c2dab185/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Error signing up with email:', data.error);
      throw new Error(data.error || 'Failed to create account');
    }

    // Success! User can now sign in
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      signInWithGoogle, 
      signInWithEmail,
      signUpWithEmail,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // During hot module reload in development, provide a fallback to prevent crashes
    if (process.env.NODE_ENV !== 'production') {
      console.warn('useAuth called outside AuthProvider during hot reload, providing safe defaults');
      return {
        user: null,
        isAuthenticated: false,
        isLoading: true,
        signInWithGoogle: async () => {},
        signInWithEmail: async () => {},
        signUpWithEmail: async () => ({}),
        logout: async () => {},
      } as AuthContextType;
    }
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
