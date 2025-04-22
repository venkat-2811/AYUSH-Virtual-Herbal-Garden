
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: "user1",
    email: "user@ayush.com",
    name: "Regular User",
    role: "user",
  },
  {
    id: "admin1",
    email: "admin@ayush.com",
    name: "Admin User",
    role: "admin",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem("ayush_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find user by email and role
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.role === role
      );
      
      if (foundUser) {
        // In a real app, you'd verify the password here
        setUser(foundUser);
        localStorage.setItem("ayush_user", JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError("An error occurred during login");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ayush_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
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
