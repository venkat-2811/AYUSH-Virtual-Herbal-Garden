
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelProps {
  url: string;
  onError: () => void;
}

// Function to validate if the URL points to a supported format
const isValidModelUrl = (url: string): boolean => {
  // Check if the URL ends with a supported 3D model extension
  const supportedExtensions = ['.glb', '.gltf'];
  const extension = url.toLowerCase().split('?')[0].split('#')[0].split('.').pop();
  return !!extension && supportedExtensions.includes(`.${extension}`);
};

function Model({ url, onError }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Load the 3D model using Three.js GLTFLoader
  const [model, setModel] = React.useState<THREE.Group | null>(null);
  
  React.useEffect(() => {
    // First validate the URL format
    if (!url || !isValidModelUrl(url)) {
      console.error('Invalid model URL or unsupported format:', url);
      setError(true);
      setLoading(false);
      onError();
      return;
    }

    console.log("Attempting to load model from URL:", url);
    const loader = new GLTFLoader();
    
    loader.load(
      url,
      (gltf) => {
        console.log("Model loaded successfully:", gltf);
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

  // Pre-validate the model URL before even trying to render it
  const [isValidModel, setIsValidModel] = useState<boolean>(true);
  
  useEffect(() => {
    if (!modelUrl || !isValidModelUrl(modelUrl)) {
      setIsValidModel(false);
      setModelLoadError(true);
      if (onError) {
        onError();
      }
    } else {
      setIsValidModel(true);
    }
  }, [modelUrl, onError]);

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
            <p className="text-sm text-herb-600 mt-1">
              {!isValidModel 
                ? "Unsupported file format. Please upload a .glb or .gltf file." 
                : "The model could not be loaded. Please try again later or contact support."}
            </p>
          </div>
        </div>
      )}
      {!modelLoadError && (
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
      )}
    </div>
  );
}

export default ModelViewer;
