
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children?: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: "user" | "admin";
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  requireAuth = false,
  requiredRole
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (requireAuth && !user) {
      // Redirect to login if authentication is required but user is not logged in
      navigate("/login", { state: { from: location.pathname } });
    } else if (requiredRole && user && user.role !== requiredRole) {
      // Redirect if user doesn't have required role
      navigate("/unauthorized");
    }
  }, [user, requireAuth, requiredRole, navigate, location]);

  if (requireAuth && !user) {
    return null; // Don't render anything while redirecting
  }

  if (requiredRole && user && user.role !== requiredRole) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-ayush-light flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {user && <Sidebar />}
        <main className="flex-1 overflow-y-auto p-4">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
