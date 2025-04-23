
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-herb-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-herb-500" />
            <span className="text-xl font-bold text-herb-700">AYUSH Virtual Herbal Garden</span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-herb-700" />
            ) : (
              <Menu className="h-6 w-6 text-herb-700" />
            )}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-herb-700 hover:text-herb-500 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-herb-700 hover:text-herb-500 font-medium">
              About
            </Link>
            <Link to="/explore" className="text-herb-700 hover:text-herb-500 font-medium">
              Explore
            </Link>
            <Link to="/contact" className="text-herb-700 hover:text-herb-500 font-medium">
              Contact
            </Link>
            {user && (
              <Link to="/chat" className="text-herb-700 hover:text-herb-500 font-medium">
                Chat
              </Link>
            )}
          </nav>
          
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                  <Button variant="outline" className="border-herb-300 text-herb-700 hover:bg-herb-50">
                    {user.role === "admin" ? "Admin Dashboard" : "Dashboard"}
                  </Button>
                </Link>
                <span className="text-herb-700">
                  {user.role === "admin" ? "Admin: " : ""}{user.name}
                </span>
                <Button
                  onClick={handleLogout}
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
                <Link to="/signup">
                  <Button className="bg-herb-500 hover:bg-herb-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-herb-100 mt-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-herb-700 hover:text-herb-500 font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-herb-700 hover:text-herb-500 font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/explore" 
                className="text-herb-700 hover:text-herb-500 font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                to="/contact" 
                className="text-herb-700 hover:text-herb-500 font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {user && (
                <>
                  <Link 
                    to="/chat" 
                    className="text-herb-700 hover:text-herb-500 font-medium px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Chat
                  </Link>
                  <Link 
                    to={user.role === "admin" ? "/admin" : "/dashboard"} 
                    className="text-herb-700 hover:text-herb-500 font-medium px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {user.role === "admin" ? "Admin Dashboard" : "Dashboard"}
                  </Link>
                </>
              )}
              
              {user ? (
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="border-herb-300 text-herb-700 hover:bg-herb-50 w-full justify-start"
                >
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="border-herb-300 text-herb-700 hover:bg-herb-50 w-full">
                      Login
                    </Button>
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="bg-herb-500 hover:bg-herb-600 text-white w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
