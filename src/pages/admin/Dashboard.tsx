
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Users, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-herb-700 mb-2">Admin Dashboard</h1>
        <p className="text-herb-600">
          Welcome back, {user?.name}. Manage your herbal database and users.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-herb-100">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-lg">Herb Database</CardTitle>
              <Leaf className="h-5 w-5 text-herb-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-herb-700">8</p>
                <p className="text-sm text-herb-500">Total Herbs</p>
              </div>
              <Link to="/admin/herbs">
                <Button variant="outline" className="border-herb-200 text-herb-700">
                  Manage Herbs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-herb-100">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-lg">User Management</CardTitle>
              <Users className="h-5 w-5 text-herb-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-herb-700">2</p>
                <p className="text-sm text-herb-500">Active Users</p>
              </div>
              <Link to="/admin/users">
                <Button variant="outline" className="border-herb-200 text-herb-700">
                  Manage Users
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-herb-100">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-lg">Settings</CardTitle>
              <Settings className="h-5 w-5 text-herb-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-herb-500">System Configuration</p>
                <p className="text-xs text-herb-400">Last updated: Today</p>
              </div>
              <Link to="/admin/settings">
                <Button variant="outline" className="border-herb-200 text-herb-700">
                  System Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg border border-herb-100 shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-herb-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/herbs">
            <Button className="w-full bg-herb-500 hover:bg-herb-600 h-auto py-3">
              <Leaf className="mr-2 h-5 w-5" />
              Add New Herb
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button className="w-full bg-herb-500 hover:bg-herb-600 h-auto py-3">
              <Users className="mr-2 h-5 w-5" />
              Manage Users
            </Button>
          </Link>
          <Link to="/admin/settings">
            <Button className="w-full bg-herb-500 hover:bg-herb-600 h-auto py-3">
              <Settings className="mr-2 h-5 w-5" />
              System Settings
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-herb-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-herb-700 mb-4">Admin Notes</h2>
        <div className="prose max-w-none text-herb-600">
          <p>Welcome to the AYUSH Virtual Herbal Garden Admin Panel. Here you can:</p>
          <ul className="pl-6 list-disc space-y-2 mt-2">
            <li>Manage the herb database - add, edit, or remove herbs.</li>
            <li>Handle user accounts and permissions.</li>
            <li>Configure system settings and integrations.</li>
            <li>Monitor platform activity and analytics.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
