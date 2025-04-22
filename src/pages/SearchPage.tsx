
import React, { useState } from "react";
import { useHerbs } from "@/contexts/HerbContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Filter, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Herb } from "@/types";

const SearchPage: React.FC = () => {
  const { herbs } = useHerbs();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Herb[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Advanced search filters
  const [filters, setFilters] = useState({
    regions: [] as string[],
    uses: [] as string[],
    compositions: [] as string[],
  });

  const allRegions = Array.from(
    new Set(herbs.flatMap((herb) => herb.region))
  ).sort();
  
  const allUses = Array.from(
    new Set(herbs.flatMap((herb) => herb.uses))
  ).sort();
  
  const allCompositions = Array.from(
    new Set(herbs.flatMap((herb) => herb.composition))
  ).sort();

  const handleFilterChange = (
    category: "regions" | "uses" | "compositions",
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      setFilters((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [category]: prev[category].filter((item) => item !== value),
      }));
    }
  };

  const handleBasicSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = herbs.filter((herb) => {
      return (
        herb.name.toLowerCase().includes(query) ||
        herb.scientificName.toLowerCase().includes(query) ||
        herb.description.toLowerCase().includes(query)
      );
    });

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleAdvancedSearch = () => {
    let results = [...herbs];

    if (filters.regions.length > 0) {
      results = results.filter((herb) => {
        return herb.region.some(region => 
          filters.regions.includes(region)
        );
      });
    }

    if (filters.uses.length > 0) {
      results = results.filter((herb) => {
        return herb.uses.some(use => 
          filters.uses.includes(use)
        );
      });
    }

    if (filters.compositions.length > 0) {
      results = results.filter((herb) => {
        return herb.composition.some(comp => 
          filters.compositions.includes(comp)
        );
      });
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-herb-800 mb-2">Search Herbs</h1>
      <p className="text-herb-600 mb-8">
        Find herbs by name, properties, or uses
      </p>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="basic">Basic Search</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search by herb name, scientific name, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBasicSearch();
                }
              }}
            />
            <Button onClick={handleBasicSearch}>
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Filter className="h-5 w-5 text-herb-500" />
                    <Label className="text-lg font-medium">Regions</Label>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allRegions.map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox
                          id={`region-${region}`}
                          checked={filters.regions.includes(region)}
                          onCheckedChange={(checked) =>
                            handleFilterChange("regions", region, !!checked)
                          }
                        />
                        <label
                          htmlFor={`region-${region}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {region}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-5 w-5 text-herb-500" />
                    <Label className="text-lg font-medium">Medicinal Uses</Label>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allUses.map((use) => (
                      <div key={use} className="flex items-center space-x-2">
                        <Checkbox
                          id={`use-${use}`}
                          checked={filters.uses.includes(use)}
                          onCheckedChange={(checked) =>
                            handleFilterChange("uses", use, !!checked)
                          }
                        />
                        <label
                          htmlFor={`use-${use}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {use}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Filter className="h-5 w-5 text-herb-500" />
                    <Label className="text-lg font-medium">Composition</Label>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allCompositions.map((comp) => (
                      <div key={comp} className="flex items-center space-x-2">
                        <Checkbox
                          id={`comp-${comp}`}
                          checked={filters.compositions.includes(comp)}
                          onCheckedChange={(checked) =>
                            handleFilterChange("compositions", comp, !!checked)
                          }
                        />
                        <label
                          htmlFor={`comp-${comp}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {comp}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleAdvancedSearch} className="mt-6">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {hasSearched && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-herb-700 mb-4">
            Search Results ({searchResults.length})
          </h2>
          
          {searchResults.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow">
              <h3 className="text-lg font-medium text-herb-800 mb-2">
                No herbs found
              </h3>
              <p className="text-herb-600 mb-4">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((herb) => (
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
                    <div className="mt-4">
                      <Link to={`/herb/${herb.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
