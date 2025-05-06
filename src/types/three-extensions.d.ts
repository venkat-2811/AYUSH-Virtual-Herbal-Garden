
import * as THREE from 'three';

declare module 'three' {
  export class GLTFLoader {
    load(
      url: string,
      onLoad: (gltf: { scene: THREE.Group; scenes: THREE.Group[]; animations: THREE.AnimationClip[]; cameras: THREE.Camera[]; }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

// Add this to support @react-three/drei useGLTF
declare module '@react-three/drei' {
  export function useGLTF(url: string): {
    scene: THREE.Group;
    scenes: THREE.Group[];
    animations: THREE.AnimationClip[];
    cameras: THREE.Camera[];
    materials: { [key: string]: THREE.Material };
  };
  export namespace useGLTF {
    function preload(url: string): void;
  }
}
