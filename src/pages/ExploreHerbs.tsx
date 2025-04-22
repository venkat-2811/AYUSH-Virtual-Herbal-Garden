
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHerbs } from "@/contexts/HerbContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Search, Filter } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getAllRegions, getAllUses } from "@/data/herbData";

const ExploreHerbs = () => {
  const { 
    filteredHerbs, 
    setSearchQuery, 
    setFilters, 
    searchQuery, 
    filters 
  } = useHerbs();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  
  const regions = getAllRegions();
  const uses = getAllUses();
  
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedUse, setSelectedUse] = useState<string>("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setFilters({
      ...filters,
      region: value ? [value] : undefined,
    });
  };
  
  const handleUseChange = (value: string) => {
    setSelectedUse(value);
    setFilters({
      ...filters,
      uses: value ? [value] : undefined,
    });
  };
  
  const clearFilters = () => {
    setSelectedRegion("");
    setSelectedUse("");
    setFilters({});
    setSearchQuery("");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-herb-700 mb-2">Explore Medicinal Herbs</h1>
        <p className="text-herb-600 text-lg mb-6 text-center max-w-2xl">
          Discover a variety of medicinal herbs, their properties, uses, and detailed information.
        </p>
        
        <div className="w-full max-w-3xl flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-herb-400" size={18} />
              <Input
                placeholder="Search herbs by name, uses, or properties..."
                className="pl-10 border-herb-200"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Button 
              variant="outline" 
              className="border-herb-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg border border-herb-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block text-herb-700">Region</label>
                  <Select value={selectedRegion} onValueChange={handleRegionChange}>
                    <SelectTrigger className="border-herb-200">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block text-herb-700">Use/Benefit</label>
                  <Select value={selectedUse} onValueChange={handleUseChange}>
                    <SelectTrigger className="border-herb-200">
                      <SelectValue placeholder="Select use/benefit" />
                    </SelectTrigger>
                    <SelectContent>
                      {uses.map(use => (
                        <SelectItem key={use} value={use}>{use}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  className="border-herb-200 text-herb-600" 
                  onClick={clearFilters}
                  size="sm"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHerbs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-herb-500">No herbs match your search criteria.</p>
            <Button 
              variant="link" 
              className="text-herb-600 mt-2" 
              onClick={clearFilters}
            >
              Clear filters and try again
            </Button>
          </div>
        ) : (
          filteredHerbs.map(herb => (
            <Card key={herb.id} className="overflow-hidden border-herb-100 hover:shadow-md transition-shadow duration-200">
              <div className="aspect-[4/3] bg-herb-50 relative">
                {herb.images && herb.images.length > 0 ? (
                  <img 
                    src={herb.images[0]} 
                    alt={herb.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-herb-50">
                    <Leaf className="h-12 w-12 text-herb-200" />
                  </div>
                )}
                
                {herb.modelUrl && (
                  <Badge className="absolute bottom-2 right-2 bg-herb-500">
                    3D Model
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-herb-700">{herb.name}</CardTitle>
                <p className="text-xs text-herb-500 italic">{herb.scientificName}</p>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-sm text-herb-600 line-clamp-2">{herb.description.substring(0, 120)}...</p>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {herb.uses.slice(0, 2).map((use, i) => (
                    <Badge key={i} variant="outline" className="bg-herb-50 text-herb-700 text-xs">
                      {use}
                    </Badge>
                  ))}
                  {herb.uses.length > 2 && (
                    <Badge variant="outline" className="bg-herb-50 text-herb-700 text-xs">
                      +{herb.uses.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  className="w-full bg-herb-500 hover:bg-herb-600"
                  onClick={() => navigate(`/herb/${herb.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ExploreHerbs;
