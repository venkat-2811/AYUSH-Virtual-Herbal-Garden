
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelProps {
  url: string;
  onError: () => void;
}

function Model({ url, onError }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Load the 3D model using Three.js GLTFLoader
  const [model, setModel] = React.useState<THREE.Group | null>(null);
  
  React.useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        setModel(gltf.scene);
        setLoading(false);
      },
      (progress) => {
        console.log(`Loading model: ${(progress.loaded / progress.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Error loading model:', error);
        setError(true);
        setLoading(false);
        onError();
      }
    );

    return () => {
      // Cleanup
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [url, onError]);

  useFrame(() => {
    if (modelRef.current && !error) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  if (error) {
    return null;
  }

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
  const [modelLoadError, setModelLoadError] = useState(false);

  const handleModelError = () => {
    setModelLoadError(true);
    if (onError) {
      onError();
    }
  };

  return (
    <div className="w-full h-full aspect-square bg-herb-50 rounded-lg overflow-hidden relative">
      {modelLoadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-herb-50 bg-opacity-80 z-10">
          <div className="text-center p-4">
            <p className="text-red-600 font-medium">Failed to load 3D model</p>
            <p className="text-sm text-herb-600 mt-1">Please try again later or contact support</p>
          </div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Model url={modelUrl} onError={handleModelError} />
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
