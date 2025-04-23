
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { login } = useAuth(); // use mock login to store
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    // Demo signup: just log in as user
    // In real app this is a backend call to add user to database
    const isUser = email === "user@ayush.com";
    const success = await login(
      email,
      password,
      isUser ? "user" : "user"
    );
    setIsLoading(false);
    if (success) {
      toast({
        title: "Account created",
        description: "Signup successful. Logging you in!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Signup failed",
        description: "Email already in use or invalid.",
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
            <CardTitle className="text-2xl font-bold text-herb-700">Sign Up</CardTitle>
            <CardDescription>
              Create an account to join AYUSH
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-herb-200"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@ayush.com"
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
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-herb-500 hover:bg-herb-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-herb-100 pt-4">
            <p className="text-sm text-herb-500">
              Already have an account?{" "}
              <a href="/login" className="underline text-herb-700">Login</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
