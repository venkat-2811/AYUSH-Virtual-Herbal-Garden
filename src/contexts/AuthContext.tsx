
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin for demo purposes
const MOCK_ADMIN: User = {
  id: "admin1",
  email: "admin@ayush.com",
  name: "Admin User",
  role: "admin",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        handleSession(session);
      }
      setIsLoading(false);
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          handleSession(session);
        } else {
          setUser(null);
          setSession(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Helper to convert Supabase session to our User type
  const handleSession = (session: Session) => {
    setSession(session);
    
    // Special case for admin@ayush.com
    if (session.user.email === 'admin@ayush.com') {
      setUser(MOCK_ADMIN);
      return;
    }

    // Convert to our User type
    const user: User = {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.user_metadata.name || 'User',
      role: 'user',
    };
    
    setUser(user);
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create new user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        }
      });
      
      if (error) {
        setError(error.message);
        toast.error(`Signup failed: ${error.message}`);
        setIsLoading(false);
        return false;
      }
      
      if (data.user) {
        toast.success("Account created successfully! You can now log in.");
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
      toast.error(`Signup error: ${err.message || "Unknown error"}`);
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email: string, password: string, role: UserRole = "user"): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Special case for mock admin
      if (email === "admin@ayush.com") {
        setUser(MOCK_ADMIN);
        localStorage.setItem("ayush_user", JSON.stringify(MOCK_ADMIN));
        setIsLoading(false);
        return true;
      }
      
      // Real authentication with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        setError(error.message);
        toast.error(`Login failed: ${error.message}`);
        setIsLoading(false);
        return false;
      }
      
      if (data.user) {
        handleSession(data.session);
        toast.success(`Welcome back, ${data.user.user_metadata.name || 'User'}!`);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
      toast.error(`Login error: ${err.message || "Unknown error"}`);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    // Supabase logout
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("ayush_user");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
