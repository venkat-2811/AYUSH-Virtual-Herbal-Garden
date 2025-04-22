
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Info, Leaf, Filter, X } from "lucide-react";
import { SearchFilters, Herb } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

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

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    region: [],
    uses: [],
    composition: []
  });

  const { data: herbs, isLoading } = useQuery({
    queryKey: ['herbs', searchQuery, filters],
    queryFn: async () => {
      // In a real app, we would fetch from Supabase with the search params
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return mockHerbs.filter(herb => {
        // Filter by search query
        if (searchQuery && !herb.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filter by region
        if (filters.region && filters.region.length > 0) {
          if (!herb.region.some(r => filters.region?.includes(r))) {
            return false;
          }
        }
        
        // Filter by uses
        if (filters.uses && filters.uses.length > 0) {
          if (!herb.uses.some(u => filters.uses?.includes(u))) {
            return false;
          }
        }
        
        // Filter by composition
        if (filters.composition && filters.composition.length > 0) {
          if (!herb.composition.some(c => filters.composition?.includes(c))) {
            return false;
          }
        }
        
        return true;
      });
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search happens automatically via React Query's dependency array
  };

  const toggleFilter = (category: keyof SearchFilters, item: string) => {
    setFilters(prev => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(item) 
          ? current.filter(i => i !== item)
          : [...current, item]
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      region: [],
      uses: [],
      composition: []
    });
  };

  // Collect all possible filter options from the mock data
  const allRegions = Array.from(new Set(mockHerbs.flatMap(h => h.region)));
  const allUses = Array.from(new Set(mockHerbs.flatMap(h => h.uses)));
  const allCompositions = Array.from(new Set(mockHerbs.flatMap(h => h.composition)));

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-herb-800 mb-2">Search Herbs</h1>
      <p className="text-herb-600 mb-8">
        Find herbs based on name, region, uses, or chemical composition
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-4 lg:hidden">
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </span>
              {showFilters ? <X className="h-4 w-4" /> : null}
            </Button>
          </div>
          
          <div className={`bg-white rounded-lg shadow p-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-herb-800">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-herb-600 hover:text-herb-800"
              >
                Clear All
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-6">
              {/* Region Filter */}
              <div>
                <h3 className="font-medium text-herb-700 mb-2">Region</h3>
                <div className="space-y-2">
                  {allRegions.map(region => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`region-${region}`}
                        checked={filters.region?.includes(region) || false}
                        onCheckedChange={() => toggleFilter('region', region)}
                      />
                      <Label 
                        htmlFor={`region-${region}`}
                        className="text-sm text-herb-600 cursor-pointer"
                      >
                        {region}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Uses Filter */}
              <div>
                <h3 className="font-medium text-herb-700 mb-2">Uses</h3>
                <div className="space-y-2">
                  {allUses.map(use => (
                    <div key={use} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`use-${use}`}
                        checked={filters.uses?.includes(use) || false}
                        onCheckedChange={() => toggleFilter('uses', use)}
                      />
                      <Label 
                        htmlFor={`use-${use}`}
                        className="text-sm text-herb-600 cursor-pointer"
                      >
                        {use}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Composition Filter */}
              <div>
                <h3 className="font-medium text-herb-700 mb-2">Chemical Composition</h3>
                <div className="space-y-2">
                  {allCompositions.map(comp => (
                    <div key={comp} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`comp-${comp}`}
                        checked={filters.composition?.includes(comp) || false}
                        onCheckedChange={() => toggleFilter('composition', comp)}
                      />
                      <Label 
                        htmlFor={`comp-${comp}`}
                        className="text-sm text-herb-600 cursor-pointer"
                      >
                        {comp}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Results */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search herbs by name or scientific name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
          
          <div className="space-y-2 mb-6">
            <h2 className="text-lg font-semibold text-herb-800">
              {isLoading 
                ? "Searching..." 
                : `${herbs?.length || 0} herbs found`}
            </h2>
            
            {Object.entries(filters).some(([_, values]) => values && values.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {filters.region?.map(region => (
                  <div key={region} className="flex items-center bg-herb-100 text-herb-700 text-xs rounded-full px-3 py-1">
                    {region}
                    <X 
                      className="ml-1 h-3 w-3 cursor-pointer" 
                      onClick={() => toggleFilter('region', region)}
                    />
                  </div>
                ))}
                {filters.uses?.map(use => (
                  <div key={use} className="flex items-center bg-herb-100 text-herb-700 text-xs rounded-full px-3 py-1">
                    {use}
                    <X 
                      className="ml-1 h-3 w-3 cursor-pointer" 
                      onClick={() => toggleFilter('uses', use)}
                    />
                  </div>
                ))}
                {filters.composition?.map(comp => (
                  <div key={comp} className="flex items-center bg-herb-100 text-herb-700 text-xs rounded-full px-3 py-1">
                    {comp}
                    <X 
                      className="ml-1 h-3 w-3 cursor-pointer" 
                      onClick={() => toggleFilter('composition', comp)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="pt-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : herbs && herbs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {herbs.map(herb => (
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
                    <div className="flex flex-wrap gap-1 mt-3">
                      {herb.uses.slice(0, 2).map(use => (
                        <span key={use} className="text-xs bg-herb-50 text-herb-600 px-2 py-0.5 rounded-full">
                          {use}
                        </span>
                      ))}
                      {herb.uses.length > 2 && (
                        <span className="text-xs bg-herb-50 text-herb-600 px-2 py-0.5 rounded-full">
                          +{herb.uses.length - 2} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link to={`/herb/${herb.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        <Info className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center shadow">
              <Leaf className="mx-auto h-12 w-12 text-herb-300 mb-4" />
              <h2 className="text-xl font-medium text-herb-800 mb-2">
                No herbs found
              </h2>
              <p className="text-herb-600">
                Try adjusting your search or filters to find what you're looking for
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
