
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-herb-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-herb-500" />
          <span className="text-xl font-bold text-herb-700">AYUSH Virtual Herbal Garden</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-herb-700 hover:text-herb-500 font-medium">
            Home
          </Link>
          <Link to="/explore" className="text-herb-700 hover:text-herb-500 font-medium">
            Explore
          </Link>
          <Link to="/about" className="text-herb-700 hover:text-herb-500 font-medium">
            About
          </Link>
          <Link to="/chat" className="text-herb-700 hover:text-herb-500 font-medium">
            Chat
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-herb-700">
                {user.role === "admin" ? "Admin: " : ""}{user.name}
              </span>
              <Button
                onClick={logout}
                variant="outline"
                className="border-herb-300 text-herb-700 hover:bg-herb-50"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" className="border-herb-300 text-herb-700 hover:bg-herb-50">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
