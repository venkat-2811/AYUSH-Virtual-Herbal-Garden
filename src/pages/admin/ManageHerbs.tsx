
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Plus, Edit, Trash2, Search, UploadCloud, Image } from "lucide-react";
import { useHerbs } from "@/contexts/HerbContext";
import { Herb } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminHerbs: React.FC = () => {
  const { herbs } = useHerbs();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentHerb, setCurrentHerb] = useState<Herb | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    description: "",
    uses: "",
    regions: "",
    composition: "",
    modelFile: null as File | null,
    modelUrl: "",
    imageFile: null as File | null,
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const checkBuckets = async () => {
      try {
        // Check if buckets exist
        const { data: modelsData, error: modelsError } = await supabase.storage.getBucket('plant-models');
        console.log("Models bucket check result:", { data: modelsData, error: modelsError });
        
        const { data: imagesData, error: imagesError } = await supabase.storage.getBucket('plant-images');
        console.log("Images bucket check result:", { data: imagesData, error: imagesError });
      } catch (err) {
        console.error('Unexpected error checking buckets:', err);
      }
    };

    checkBuckets();
  }, []);

  const filteredHerbs = herbs.filter((herb) =>
    herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    herb.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "modelFile" && files && files[0]) {
      setFormData((prev) => ({ ...prev, modelFile: files[0] }));
    } else if (name === "imageFile" && files && files[0]) {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      scientificName: "",
      description: "",
      uses: "",
      regions: "",
      composition: "",
      modelFile: null,
      modelUrl: "",
      imageFile: null,
      imageUrl: "",
    });
    setActiveTab("details");
  };

  const handleAddHerb = async () => {
    setUploading(true);
    try {
      let modelUrl = "";
      let imageUrl = "";
      
      // Upload model if provided
      if (formData.modelFile) {
        const fileName = `${formData.name.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}.glb`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("plant-models")
          .upload(fileName, formData.modelFile, {
            cacheControl: "3600",
            upsert: true,
          });
        
        if (uploadError) {
          console.error("Model upload error:", uploadError);
          toast.error(`Failed to upload model: ${uploadError.message}`);
          setUploading(false);
          return;
        }
        
        const { data: urlData } = supabase.storage
          .from("plant-models")
          .getPublicUrl(fileName);
        
        modelUrl = urlData.publicUrl;
      }
      
      // Upload image if provided
      if (formData.imageFile) {
        const fileName = `${formData.name.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}`;
        const fileExt = formData.imageFile.name.split('.').pop();
        const fullFileName = `${fileName}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("plant-images")
          .upload(fullFileName, formData.imageFile, {
            cacheControl: "3600",
            upsert: true,
          });
        
        if (uploadError) {
          console.error("Image upload error:", uploadError);
          toast.error(`Failed to upload image: ${uploadError.message}`);
          // Continue with herb creation even if image upload fails
        } else {
          const { data: urlData } = supabase.storage
            .from("plant-images")
            .getPublicUrl(fullFileName);
          
          imageUrl = urlData.publicUrl;
        }
      }

      // Here we would create the herb in a real app
      console.log("New herb data:", {
        ...formData,
        modelUrl,
        imageUrl,
        uses: formData.uses.split(',').map(item => item.trim()),
        region: formData.regions.split(',').map(item => item.trim()),
        composition: formData.composition.split(',').map(item => item.trim()),
      });
      
      toast.success("Herb added successfully" + (modelUrl ? " with 3D model" : "") + (imageUrl ? " with image" : ""));
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Error handling herb creation:", error);
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleEditHerb = async () => {
    setUploading(true);
    try {
      let modelUrl = formData.modelUrl;
      let imageUrl = formData.imageUrl || (currentHerb?.images?.[0] || "");
      
      // Upload 3D model if provided
      if (formData.modelFile) {
        const fileName = `${formData.name.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}.glb`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("plant-models")
          .upload(fileName, formData.modelFile, {
            cacheControl: "3600",
            upsert: true,
          });
        
        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error(`Failed to upload model: ${uploadError.message}`);
          setUploading(false);
          return;
        }
        
        const { data: urlData } = supabase.storage
          .from("plant-models")
          .getPublicUrl(fileName);
        
        modelUrl = urlData.publicUrl;
      }
      
      // Upload image if provided
      if (formData.imageFile) {
        const fileName = `${formData.name.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}`;
        const fileExt = formData.imageFile.name.split('.').pop();
        const fullFileName = `${fileName}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("plant-images")
          .upload(fullFileName, formData.imageFile, {
            cacheControl: "3600",
            upsert: true,
          });
        
        if (uploadError) {
          console.error("Image upload error:", uploadError);
          toast.error(`Failed to upload image: ${uploadError.message}`);
        } else {
          const { data: urlData } = supabase.storage
            .from("plant-images")
            .getPublicUrl(fullFileName);
          
          imageUrl = urlData.publicUrl;
        }
      }
      
      // Here we would update the herb data in a real app
      console.log("Updated herb data:", {
        ...formData,
        modelUrl,
        imageUrl,
        uses: formData.uses.split(',').map(item => item.trim()),
        region: formData.regions.split(',').map(item => item.trim()),
        composition: formData.composition.split(',').map(item => item.trim()),
      });
      
      setIsEditDialogOpen(false);
      resetForm();
      toast.success("Herb updated successfully" + (modelUrl ? " with 3D model" : "") + (imageUrl ? " with image" : ""));
    } catch (error: any) {
      console.error("Error handling herb update:", error);
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteHerb = () => {
    toast.success("Herb deleted successfully");
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (herb: Herb) => {
    setCurrentHerb(herb);
    setFormData({
      name: herb.name,
      scientificName: herb.scientificName,
      description: herb.description,
      uses: herb.uses.join(", "),
      regions: herb.region.join(", "),
      composition: herb.composition.join(", "),
      modelFile: null,
      modelUrl: herb.modelUrl || "",
      imageFile: null,
      imageUrl: herb.images && herb.images.length > 0 ? herb.images[0] : "",
    });
    setIsEditDialogOpen(true);
    setActiveTab("details");
  };

  const openDeleteDialog = (herb: Herb) => {
    setCurrentHerb(herb);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-herb-800 mb-2">Manage Herbs</h1>
          <p className="text-herb-600">Add, edit, or remove herbs from the database</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Add New Herb
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Herb</DialogTitle>
              <DialogDescription>
                Enter the details for the new herb
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="uses">Uses & Regions</TabsTrigger>
                <TabsTrigger value="files">Media Files</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Common name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="scientificName">Scientific Name</Label>
                    <Input
                      id="scientificName"
                      name="scientificName"
                      value={formData.scientificName}
                      onChange={handleInputChange}
                      placeholder="Scientific name"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Detailed description of the herb"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="composition">Chemical Composition</Label>
                    <Input
                      id="composition"
                      name="composition"
                      value={formData.composition}
                      onChange={handleInputChange}
                      placeholder="Comma separated chemical compounds"
                    />
                    <p className="text-xs text-herb-500">Separate compounds with commas</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="uses" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="uses">Medicinal Uses</Label>
                    <Textarea
                      id="uses"
                      name="uses"
                      value={formData.uses}
                      onChange={handleInputChange}
                      placeholder="Comma separated uses"
                      rows={3}
                    />
                    <p className="text-xs text-herb-500">Separate uses with commas</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="regions">Regions</Label>
                    <Textarea
                      id="regions"
                      name="regions"
                      value={formData.regions}
                      onChange={handleInputChange}
                      placeholder="Comma separated regions"
                      rows={3}
                    />
                    <p className="text-xs text-herb-500">Separate regions with commas</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="files" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-image">Plant Image [Optional]</Label>
                    <Input
                      id="add-image"
                      name="imageFile"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-herb-500">
                      Upload an image (JPG, JPEG, PNG). Max size 5MB.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="add-model">3D Model (.glb) [Optional]</Label>
                    <Input
                      id="add-model"
                      name="modelFile"
                      type="file"
                      accept=".glb,model/gltf-binary"
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-herb-500">
                      Upload a 3D model (GLB). Max size 10MB.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddHerb} disabled={uploading}>
                {uploading ? (
                  <>
                    <UploadCloud className="h-4 w-4 mr-1 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>Save Herb</>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Herb Database</CardTitle>
            <div className="relative w-full md:max-w-xs">
              <Input
                placeholder="Search herbs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-herb-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Scientific Name</TableHead>
                  <TableHead className="hidden md:table-cell">Uses</TableHead>
                  <TableHead className="hidden lg:table-cell">Regions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHerbs.map((herb) => (
                  <TableRow key={herb.id}>
                    <TableCell>{herb.name}</TableCell>
                    <TableCell className="italic">{herb.scientificName}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      {herb.uses.join(", ")}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {herb.region.join(", ")}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(herb)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openDeleteDialog(herb)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredHerbs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No herbs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Herb</DialogTitle>
            <DialogDescription>
              Update the details for this herb
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="uses">Uses & Regions</TabsTrigger>
              <TabsTrigger value="files">Media Files</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-scientificName">Scientific Name</Label>
                  <Input
                    id="edit-scientificName"
                    name="scientificName"
                    value={formData.scientificName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-composition">Chemical Composition</Label>
                  <Input
                    id="edit-composition"
                    name="composition"
                    value={formData.composition}
                    onChange={handleInputChange}
                    placeholder="Comma separated chemical compounds"
                  />
                  <p className="text-xs text-herb-500">Separate compounds with commas</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="uses" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-uses">Medicinal Uses</Label>
                  <Textarea
                    id="edit-uses"
                    name="uses"
                    value={formData.uses}
                    onChange={handleInputChange}
                    placeholder="Comma separated uses"
                    rows={3}
                  />
                  <p className="text-xs text-herb-500">Separate uses with commas</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-regions">Regions</Label>
                  <Textarea
                    id="edit-regions"
                    name="regions"
                    value={formData.regions}
                    onChange={handleInputChange}
                    placeholder="Comma separated regions"
                    rows={3}
                  />
                  <p className="text-xs text-herb-500">Separate regions with commas</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-image">Plant Image [Optional]</Label>
                  <Input
                    id="edit-image"
                    name="imageFile"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleInputChange}
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <p className="text-xs text-herb-600 mb-1">Current image:</p>
                      <div className="relative h-20 w-20 overflow-hidden rounded-md border border-herb-200">
                        <img
                          src={formData.imageUrl}
                          alt="Plant"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-herb-500">
                    Upload an image (JPG, JPEG, PNG). Max size 5MB.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-model">3D Model (.glb) [Optional]</Label>
                  <Input
                    id="edit-model"
                    name="modelFile"
                    type="file"
                    accept=".glb,model/gltf-binary"
                    onChange={handleInputChange}
                  />
                  {formData.modelUrl && (
                    <a
                      href={formData.modelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-herb-600 underline text-xs"
                    >
                      View Current Model
                    </a>
                  )}
                  <p className="text-xs text-herb-500">
                    Upload a 3D model (GLB). Max size 10MB.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditHerb} disabled={uploading}>
              {uploading ? (
                <>
                  <UploadCloud className="h-4 w-4 mr-1 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>Update Herb</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Herb</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentHerb?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteHerb}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHerbs;
