import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HerbProvider } from "@/contexts/HerbContext";
import { ChatProvider } from "@/contexts/ChatContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import ExploreHerbs from "./pages/ExploreHerbs";
import HerbDetail from "./pages/HerbDetail";
import ChatPage from "./pages/ChatPage";
import UserProfile from "./pages/user/Profile";
import UserCollection from "./pages/user/Collection";
import SearchPage from "./pages/SearchPage";
import AdminHerbs from "./pages/admin/ManageHerbs";
import AdminUsers from "./pages/admin/ManageUsers";
import AdminSettings from "./pages/admin/Settings";
import Unauthorized from "./pages/Unauthorized";
import About from "./pages/About";
import Signup from "./pages/Signup";

// Layout
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HerbProvider>
        <ChatProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* User routes */}
                <Route path="/dashboard" element={<AppLayout requireAuth><UserDashboard /></AppLayout>} />
                <Route path="/explore" element={<AppLayout><ExploreHerbs /></AppLayout>} />
                <Route path="/herb/:id" element={<AppLayout><HerbDetail /></AppLayout>} />
                <Route path="/chat" element={<AppLayout><ChatPage /></AppLayout>} />
                <Route path="/search" element={<AppLayout requireAuth><SearchPage /></AppLayout>} />
                <Route path="/profile" element={<AppLayout requireAuth><UserProfile /></AppLayout>} />
                <Route path="/collection" element={<AppLayout requireAuth><UserCollection /></AppLayout>} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<AppLayout requireAuth requiredRole="admin"><AdminDashboard /></AppLayout>} />
                <Route path="/admin/herbs" element={<AppLayout requireAuth requiredRole="admin"><AdminHerbs /></AppLayout>} />
                <Route path="/admin/users" element={<AppLayout requireAuth requiredRole="admin"><AdminUsers /></AppLayout>} />
                <Route path="/admin/settings" element={<AppLayout requireAuth requiredRole="admin"><AdminSettings /></AppLayout>} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ChatProvider>
      </HerbProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
