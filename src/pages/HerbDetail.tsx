
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Leaf, MapPin, FlaskConical, Heart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useHerbs } from "@/contexts/HerbContext";
import ModelViewer from "@/components/ModelViewer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Herb } from "@/types";
import { getHerbById } from "@/data/herbData";

const HerbDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCollection, herbs } = useHerbs();
  
  const { data: herb, isLoading } = useQuery({
    queryKey: ['herb', id],
    queryFn: async () => {
      if (!id) return null;
      
      const foundHerb = getHerbById(id);
      if (!foundHerb) {
        console.error("Herb not found with ID:", id);
      }
      return foundHerb;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleAddToCollection = () => {
    if (!user) {
      toast("Please log in to add herbs to your collection");
      return;
    }
    
    if (herb) {
      addToCollection(herb);
      toast("Added to your collection!");
    }
  };

  // Improved helper function to get display image URL
  const getDisplayImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg";
    
    // For debugging
    console.log("Image URL:", url);
    
    // If the URL is already absolute (starts with http or https), use it directly
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // For local assets
    return url;
  };

  // Check if model URL is valid
  const isValidModelUrl = (url?: string) => {
    if (!url) return false;
    return url.startsWith('/') || url.startsWith('http');
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 space-y-8">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-80 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!herb) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-herb-800">Herb not found</h1>
        <p className="text-herb-600 mt-4">The herb you are looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-herb-800">{herb.name}</h1>
      <p className="text-herb-600 italic">{herb.scientificName}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          {isValidModelUrl(herb.modelUrl) ? (
            <div className="aspect-square bg-herb-50 flex items-center justify-center relative">
              <img 
                src={getDisplayImageUrl(herb.images[0])} 
                alt={herb.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", herb.images[0]);
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="absolute bottom-4 right-4">
                    <Eye className="mr-2 h-4 w-4" />
                    View 3D Model
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>3D Model: {herb.name}</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 h-full min-h-[500px] relative">
                    <ModelViewer modelUrl={herb.modelUrl || ''} />
                    <div className="absolute bottom-4 left-4 text-sm text-gray-500">
                      Note: 3D models require WebGL support in your browser
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="aspect-square bg-herb-50 flex items-center justify-center">
              <img 
                src={getDisplayImageUrl(herb.images[0])} 
                alt={herb.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", herb.images[0]);
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-herb-800">Description</h2>
            <p className="mt-2 text-herb-600">{herb.description}</p>
          </div>
          
          <Separator />

          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-herb-800">
              <MapPin className="h-5 w-5 text-herb-500" />
              Regions
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {herb.region.map((region) => (
                <span key={region} className="px-3 py-1 rounded-full bg-herb-100 text-herb-700 text-sm">
                  {region}
                </span>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <Button 
            onClick={handleAddToCollection}
            className="w-full"
          >
            <Heart className="mr-2 h-4 w-4" />
            Add to Collection
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card>
          <CardContent className="pt-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-herb-800 mb-4">
              <Leaf className="h-5 w-5 text-herb-500" />
              Medicinal Uses
            </h2>
            <ul className="space-y-2">
              {herb.uses.map((use) => (
                <li key={use} className="flex items-center gap-2 text-herb-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-herb-400"></span>
                  {use}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-herb-800 mb-4">
              <FlaskConical className="h-5 w-5 text-herb-500" />
              Chemical Composition
            </h2>
            <ul className="space-y-2">
              {herb.composition.map((compound) => (
                <li key={compound} className="flex items-center gap-2 text-herb-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-herb-400"></span>
                  {compound}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HerbDetail;
