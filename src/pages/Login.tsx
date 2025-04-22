
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const from = (location.state as any)?.from || "/";
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate(from === "/" ? "/dashboard" : from);
      }
    } else {
      toast({
        title: "Login failed",
        description: error || "Invalid email or password",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-ayush-light p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-3 shadow-md">
            <Leaf className="h-12 w-12 text-herb-500" />
          </div>
        </div>
        
        <Card className="border-herb-100 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-herb-700">Welcome to AYUSH</CardTitle>
            <CardDescription>
              Virtual Herbal Garden Login
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="user" onValueChange={(value) => setRole(value as "user" | "admin")}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="user">User Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={role === "admin" ? "admin@ayush.com" : "user@ayush.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-herb-200"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-herb-200"
                    />
                    <p className="text-xs text-herb-500 mt-1">
                      For demo: any password works with the provided emails
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-herb-500 hover:bg-herb-600" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
          
          <CardFooter className="justify-center border-t border-herb-100 pt-4">
            <p className="text-sm text-herb-500">
              Demo accounts: user@ayush.com (user) or admin@ayush.com (admin)
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
