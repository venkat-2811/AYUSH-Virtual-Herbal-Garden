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
