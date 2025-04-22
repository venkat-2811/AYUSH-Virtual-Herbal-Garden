
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { Loader2, Save, Globe, ShieldAlert, MessageSquare } from "lucide-react";

const AdminSettings: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "AYUSH Virtual Herbal Garden",
    siteDescription: "Explore the world of medicinal herbs with interactive 3D models and comprehensive information.",
    contactEmail: "contact@ayushgarden.org",
    enableRegistration: true,
    enableChat: true,
    maintenance: false
  });
  
  const [apiSettings, setApiSettings] = useState({
    geminiApiKey: "AIzaSyASkyEiWCjOXiMMXRySnRBOtVcwegvHWe4",
    modelName: "gemini-2.0-flash",
    maxTokens: 1024,
    temperature: 0.7
  });
  
  const handleGeneralChange = (key: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleApiChange = (key: string, value: any) => {
    setApiSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSaveGeneral = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast("General settings saved successfully!");
    } catch (error) {
      toast("Failed to save settings");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleSaveApi = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast("API settings saved successfully!");
    } catch (error) {
      toast("Failed to save API settings");
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-herb-800 mb-8">Admin Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            API & Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={e => handleGeneralChange("siteName", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={e => handleGeneralChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={e => handleGeneralChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Feature Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableRegistration" className="text-base font-normal">
                      Enable User Registration
                    </Label>
                    <p className="text-sm text-herb-500">
                      Allow new users to sign up for an account
                    </p>
                  </div>
                  <Switch
                    id="enableRegistration"
                    checked={generalSettings.enableRegistration}
                    onCheckedChange={value => handleGeneralChange("enableRegistration", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableChat" className="text-base font-normal">
                      Enable Chat Feature
                    </Label>
                    <p className="text-sm text-herb-500">
                      Allow users to chat with the AI assistant
                    </p>
                  </div>
                  <Switch
                    id="enableChat"
                    checked={generalSettings.enableChat}
                    onCheckedChange={value => handleGeneralChange("enableChat", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance" className="text-base font-normal">
                      Maintenance Mode
                    </Label>
                    <p className="text-sm text-herb-500">
                      Put the site in maintenance mode (only admins can access)
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={generalSettings.maintenance}
                    onCheckedChange={value => handleGeneralChange("maintenance", value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveGeneral} 
                disabled={isUpdating}
                className="mt-4"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Gemini AI Integration</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    value={apiSettings.geminiApiKey}
                    onChange={e => handleApiChange("geminiApiKey", e.target.value)}
                    type="password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="modelName">Model Name</Label>
                  <Input
                    id="modelName"
                    value={apiSettings.modelName}
                    onChange={e => handleApiChange("modelName", e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      value={apiSettings.maxTokens.toString()}
                      onChange={e => handleApiChange("maxTokens", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={apiSettings.temperature.toString()}
                      onChange={e => handleApiChange("temperature", parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-herb-500">
                      Higher values make output more random, lower values more deterministic (0-1)
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveApi}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save API Settings
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-herb-700">
                <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-herb-400" />
                <p className="mb-2">Security settings will be implemented in a future update.</p>
                <p className="text-sm text-herb-500">
                  This section will include password policies, login attempts, and other security features.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
