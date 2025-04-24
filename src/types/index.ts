export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  uses: string[];
  region: string[];
  composition: string[];
  images: string[];
  modelUrl?: string; // For 3D model
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface SearchFilters {
  name?: string;
  region?: string[];
  uses?: string[];
  composition?: string[];
}

export interface GLTFResult {
  scene: THREE.Group;
  scenes: THREE.Group[];
  animations: THREE.AnimationClip[];
  cameras: THREE.Camera[];
  asset: {
    generator: string;
    version: string;
  };
}
