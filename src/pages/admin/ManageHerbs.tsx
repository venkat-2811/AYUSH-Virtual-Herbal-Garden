import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import type { Herb } from "@/types";

const mockHerbs: Herb[] = [
  {
    id: "1",
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    description: "Tulsi, also known as Holy Basil, is a sacred plant in Hindu belief.",
    uses: ["Respiratory disorders", "Stress", "Fever"],
    region: ["India", "Southeast Asia"],
    composition: ["Eugenol", "Ursolic acid"],
    images: ["/placeholder.svg"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    description: "Ashwagandha is an adaptogenic herb popular in Ayurvedic medicine.",
    uses: ["Stress", "Anxiety", "Energy"],
    region: ["India", "Middle East", "Africa"],
    composition: ["Withanolides", "Alkaloids"],
    images: ["/placeholder.svg"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Neem",
    scientificName: "Azadirachta indica",
    description: "Neem is known for its pesticidal and medicinal properties.",
    uses: ["Skin disorders", "Dental care", "Pest control"],
    region: ["India", "Southeast Asia"],
    composition: ["Azadirachtin", "Nimbin"],
    images: ["/placeholder.svg"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const AdminHerbs: React.FC = () => {
  const [herbs, setHerbs] = useState<Herb[]>(mockHerbs);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  
  const filteredHerbs = herbs.filter(herb => 
    herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDelete = (herb: Herb) => {
    setSelectedHerb(herb);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedHerb) {
      setHerbs(herbs.filter(h => h.id !== selectedHerb.id));
      toast(`Deleted herb: ${selectedHerb.name}`);
      setDeleteDialogOpen(false);
      setSelectedHerb(null);
    }
  };
  
  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-herb-800">Manage Herbs</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Herb
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Herb</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Herb Name</Label>
                <Input id="name" placeholder="Common name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scientificName">Scientific Name</Label>
                <Input id="scientificName" placeholder="Latin name" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the herb" className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uses">Medicinal Uses</Label>
                <Input id="uses" placeholder="Separate with commas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Regions</Label>
                <Input id="region" placeholder="Separate with commas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="composition">Chemical Composition</Label>
                <Input id="composition" placeholder="Separate with commas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Images</Label>
                <Input id="image" type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">3D Model (optional)</Label>
                <Input id="model" type="file" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => toast("Herb added successfully!")}>
                Save Herb
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex items-center relative flex-1">
            <Search className="absolute left-3 text-herb-500 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search herbs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Herbs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHerbs.map(herb => (
          <Card key={herb.id} className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img
                src={herb.images[0] || "/placeholder.svg"}
                alt={herb.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="pt-4">
              <h3 className="font-semibold text-lg text-herb-800">{herb.name}</h3>
              <p className="text-sm italic text-herb-600 mb-2">{herb.scientificName}</p>
              <p className="text-herb-700 line-clamp-2 text-sm">
                {herb.description.substring(0, 100)}
                {herb.description.length > 100 ? '...' : ''}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Edit Herb: {herb.name}</DialogTitle>
                  </DialogHeader>
                  {/* Same form as Add New Herb but with pre-filled values */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-name-${herb.id}`}>Herb Name</Label>
                      <Input id={`edit-name-${herb.id}`} defaultValue={herb.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-scientific-${herb.id}`}>Scientific Name</Label>
                      <Input id={`edit-scientific-${herb.id}`} defaultValue={herb.scientificName} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`edit-description-${herb.id}`}>Description</Label>
                      <Textarea id={`edit-description-${herb.id}`} defaultValue={herb.description} className="min-h-[100px]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-uses-${herb.id}`}>Medicinal Uses</Label>
                      <Input id={`edit-uses-${herb.id}`} defaultValue={herb.uses.join(', ')} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-region-${herb.id}`}>Regions</Label>
                      <Input id={`edit-region-${herb.id}`} defaultValue={herb.region.join(', ')} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-composition-${herb.id}`}>Chemical Composition</Label>
                      <Input id={`edit-composition-${herb.id}`} defaultValue={herb.composition.join(', ')} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-image-${herb.id}`}>Images</Label>
                      <Input id={`edit-image-${herb.id}`} type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-model-${herb.id}`}>3D Model (optional)</Label>
                      <Input id={`edit-model-${herb.id}`} type="file" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => toast(`Updated herb: ${herb.name}`)}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(herb)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              Delete Herb
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete <strong>{selectedHerb?.name}</strong>?</p>
            <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Empty state */}
      {filteredHerbs.length === 0 && (
        <div className="bg-white rounded-lg p-8 text-center shadow mt-6">
          <h2 className="text-xl font-medium text-herb-800 mb-2">
            No herbs found
          </h2>
          <p className="text-herb-600">
            {searchQuery ? 'Try a different search term' : 'Add your first herb to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminHerbs;
