
import { Herb } from "@/types";

// Mock data for herbs
export const HERBS_DATA: Herb[] = [
  {
    id: "1",
    name: "Tulsi (Holy Basil)",
    scientificName: "Ocimum sanctum",
    description: "Tulsi is one of the most sacred plants in India and is an important symbol in Hindu religious tradition. It is widely known for its healing properties and medicinal uses.",
    uses: ["Respiratory disorders", "Fever", "Stress relief", "Immune support"],
    region: ["India", "Southeast Asia"],
    composition: ["Eugenol", "Ursolic acid", "Carvacrol"],
    images: ["/herbs/tulsi.jpg"],
    modelUrl: "/models/tulsi.glb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    description: "Ashwagandha is one of the most powerful herbs in Ayurvedic healing. It is known for its restorative and rejuvenating benefits.",
    uses: ["Stress relief", "Energy boost", "Cognitive function", "Anti-inflammatory"],
    region: ["India", "Middle East", "Africa"],
    composition: ["Withanolides", "Alkaloids", "Steroidal lactones"],
    images: ["/herbs/ashwagandha.jpg"],
    modelUrl: "/models/ashwagandha.glb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Amla (Indian Gooseberry)",
    scientificName: "Phyllanthus emblica",
    description: "Amla is a potent source of Vitamin C and is widely used in Ayurvedic medicine for its rejuvenating properties.",
    uses: ["Immune support", "Digestion", "Anti-aging", "Hair health"],
    region: ["India", "Southeast Asia"],
    composition: ["Vitamin C", "Flavonoids", "Gallic acid"],
    images: ["/herbs/amla.jpg"],
    modelUrl: "/models/amla.glb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    description: "Turmeric is widely used as a spice but is also known for its medicinal properties. The active compound, curcumin, has powerful anti-inflammatory effects.",
    uses: ["Anti-inflammatory", "Joint health", "Antioxidant", "Digestive health"],
    region: ["India", "Southeast Asia"],
    composition: ["Curcumin", "Turmerone", "Zingiberene"],
    images: ["/herbs/turmeric.jpg"],
    modelUrl: "/models/turmeric.glb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Brahmi",
    scientificName: "Bacopa monnieri",
    description: "Brahmi is a staple herb in Ayurvedic medicine. It's used to improve memory, reduce anxiety, and treat various ailments.",
    uses: ["Memory enhancement", "Anxiety reduction", "Cognitive support", "Stress relief"],
    region: ["India", "Australia", "Europe"],
    composition: ["Bacosides", "Alkaloids", "Flavonoids"],
    images: ["/herbs/brahmi.jpg"],
    modelUrl: "/models/brahmi.glb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Neem",
    scientificName: "Azadirachta indica",
    description: "Neem is known for its pesticide and medicinal properties. It's been used in traditional medicine for centuries due to its health-promoting properties.",
    uses: ["Skin conditions", "Dental care", "Blood purifier", "Anti-bacterial"],
    region: ["India", "Southeast Asia"],
    composition: ["Nimbin", "Nimbidin", "Azadirachtin"],
    images: ["/herbs/neem.jpg"],
    modelUrl: "/models/neem.glb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    name: "Guduchi",
    scientificName: "Tinospora cordifolia",
    description: "Guduchi is a herbaceous vine that is widely used in traditional Ayurvedic medicine for its immune-boosting properties.",
    uses: ["Immune support", "Anti-inflammatory", "Liver protection", "Stress relief"],
    region: ["India", "Sri Lanka", "Myanmar"],
    composition: ["Berberine", "Tinosporin", "Giloin"],
    images: ["/herbs/guduchi.jpg"],
    modelUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    name: "Shankhpushpi",
    scientificName: "Convolvulus pluricaulis",
    description: "Shankhpushpi is a perennial herb that is primarily known for its cognitive enhancing properties.",
    uses: ["Memory enhancement", "Mental health", "Brain tonic", "Anti-anxiety"],
    region: ["India", "Nepal"],
    composition: ["Shankhpushpine", "Convolamine", "Kaempferol"],
    images: ["/herbs/shankhpushpi.jpg"],
    modelUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Helper functions to work with herb data
export const getHerbById = (id: string): Herb | undefined => {
  return HERBS_DATA.find(herb => herb.id === id);
};

export const searchHerbs = (query: string): Herb[] => {
  const lowerQuery = query.toLowerCase();
  return HERBS_DATA.filter(herb => 
    herb.name.toLowerCase().includes(lowerQuery) || 
    herb.scientificName.toLowerCase().includes(lowerQuery) ||
    herb.description.toLowerCase().includes(lowerQuery) ||
    herb.uses.some(use => use.toLowerCase().includes(lowerQuery)) ||
    herb.composition.some(comp => comp.toLowerCase().includes(lowerQuery)) ||
    herb.region.some(region => region.toLowerCase().includes(lowerQuery))
  );
};

export const filterHerbs = (filters: {
  region?: string[],
  uses?: string[],
  composition?: string[]
}): Herb[] => {
  return HERBS_DATA.filter(herb => {
    // Check region filter
    if (filters.region && filters.region.length > 0) {
      if (!filters.region.some(r => herb.region.includes(r))) {
        return false;
      }
    }
    
    // Check uses filter
    if (filters.uses && filters.uses.length > 0) {
      if (!filters.uses.some(u => herb.uses.includes(u))) {
        return false;
      }
    }
    
    // Check composition filter
    if (filters.composition && filters.composition.length > 0) {
      if (!filters.composition.some(c => herb.composition.includes(c))) {
        return false;
      }
    }
    
    return true;
  });
};

// Get all unique regions, uses, and composition for filters
export const getAllRegions = (): string[] => {
  const regions = new Set<string>();
  HERBS_DATA.forEach(herb => {
    herb.region.forEach(r => regions.add(r));
  });
  return Array.from(regions).sort();
};

export const getAllUses = (): string[] => {
  const uses = new Set<string>();
  HERBS_DATA.forEach(herb => {
    herb.uses.forEach(u => uses.add(u));
  });
  return Array.from(uses).sort();
};

export const getAllCompositions = (): string[] => {
  const compositions = new Set<string>();
  HERBS_DATA.forEach(herb => {
    herb.composition.forEach(c => compositions.add(c));
  });
  return Array.from(compositions).sort();
};
