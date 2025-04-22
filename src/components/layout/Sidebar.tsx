
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Leaf, Flower, User, Users, Settings, Search } from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Menu items based on user role
  const menuItems = user?.role === "admin" 
    ? [
        { name: "Dashboard", path: "/admin", icon: Home },
        { name: "Manage Herbs", path: "/admin/herbs", icon: Leaf },
        { name: "Users", path: "/admin/users", icon: Users },
        { name: "Settings", path: "/admin/settings", icon: Settings },
      ]
    : [
        { name: "Dashboard", path: "/dashboard", icon: Home },
        { name: "Explore", path: "/explore", icon: Flower },
        { name: "My Collection", path: "/collection", icon: Leaf },
        { name: "Search", path: "/search", icon: Search },
        { name: "Profile", path: "/profile", icon: User },
      ];
  
  return (
    <div className="w-64 bg-white border-r border-herb-200 h-full overflow-y-auto">
      <div className="p-4">
        <div className="mb-8">
          <div className="text-herb-900 font-semibold">
            {user?.role === "admin" ? "Admin Panel" : "User Menu"}
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                isActive(item.path)
                  ? "bg-herb-100 text-herb-700"
                  : "text-herb-600 hover:text-herb-700 hover:bg-herb-50"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
