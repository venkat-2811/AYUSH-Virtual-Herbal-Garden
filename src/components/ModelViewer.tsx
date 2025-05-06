
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  
  // Load the 3D model using Three.js GLTFLoader
  const [model, setModel] = React.useState<THREE.Group | null>(null);
  
  React.useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        setModel(gltf.scene);
      },
      (progress) => {
        console.log(`Loading model: ${(progress.loaded / progress.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }, [url]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={modelRef}>
      {model && <primitive object={model} scale={2} position={[0, -1, 0]} />}
    </group>
  );
}

interface ModelViewerProps {
  modelUrl: string;
  onError?: () => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, onError }) => {
  // Error handling
  React.useEffect(() => {
    const handleError = () => {
      if (onError) {
        onError();
      }
    };
    
    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [onError]);

  return (
    <div className="w-full h-full aspect-square bg-herb-50 rounded-lg overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

export default ModelViewer;
