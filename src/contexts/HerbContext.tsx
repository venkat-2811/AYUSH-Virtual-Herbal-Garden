
import React, { createContext, useContext, useState, useEffect } from "react";
import { Herb, SearchFilters } from "@/types";
import { HERBS_DATA, searchHerbs, filterHerbs } from "@/data/herbData";

interface HerbContextType {
  herbs: Herb[];
  loading: boolean;
  selectedHerb: Herb | null;
  setSelectedHerb: (herb: Herb | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  filteredHerbs: Herb[];
  refreshHerbs: () => void;
}

const HerbContext = createContext<HerbContextType | undefined>(undefined);

export function HerbProvider({ children }: { children: React.ReactNode }) {
  const [herbs, setHerbs] = useState<Herb[]>(HERBS_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>(HERBS_DATA);

  // Effect for handling search and filters
  useEffect(() => {
    setLoading(true);
    
    let result = [...HERBS_DATA];
    
    // Apply search query
    if (searchQuery) {
      result = searchHerbs(searchQuery);
    }
    
    // Apply filters
    if (filters.region || filters.uses || filters.composition) {
      result = filterHerbs({
        region: filters.region,
        uses: filters.uses,
        composition: filters.composition,
      }).filter(herb => result.includes(herb));
    }
    
    setFilteredHerbs(result);
    setLoading(false);
  }, [searchQuery, filters]);

  const refreshHerbs = () => {
    setHerbs([...HERBS_DATA]);
    setFilteredHerbs([...HERBS_DATA]);
  };

  return (
    <HerbContext.Provider 
      value={{
        herbs,
        loading,
        selectedHerb,
        setSelectedHerb,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        filteredHerbs,
        refreshHerbs,
      }}
    >
      {children}
    </HerbContext.Provider>
  );
}

export const useHerbs = () => {
  const context = useContext(HerbContext);
  if (context === undefined) {
    throw new Error("useHerbs must be used within a HerbProvider");
  }
  return context;
};
