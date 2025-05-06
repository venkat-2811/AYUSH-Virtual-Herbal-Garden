
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

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

// Check if URL is public or relative
const isPublicUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

function Model({ url, onError }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Use the useGLTF hook from drei for better model loading
  let gltf;
  try {
    gltf = useGLTF(url);
  } catch (err) {
    console.error("Error in useGLTF:", err);
    if (!error) {
      setError(true);
      onError();
    }
  }

  // Rotate the model
  useFrame(() => {
    if (modelRef.current && !error) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  // Cleanup function
  useEffect(() => {
    return () => {
      if (gltf) {
        // Cleanup model resources
        useGLTF.preload(url);
      }
    };
  }, [url, gltf]);

  if (error || !gltf) {
    return null;
  }

  return (
    <group ref={modelRef}>
      <primitive 
        object={gltf.scene} 
        scale={2} 
        position={[0, -1, 0]} 
        dispose={null}
      />
    </group>
  );
}

interface ModelViewerProps {
  modelUrl: string;
  onError?: () => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, onError }) => {
  const [modelLoadError, setModelLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pre-validate the model URL
  const [isValidModel, setIsValidModel] = useState<boolean>(true);
  
  useEffect(() => {
    console.log("Attempting to load model from URL:", modelUrl);
    
    if (!modelUrl || !isValidModelUrl(modelUrl)) {
      console.error('Invalid model URL or unsupported format:', modelUrl);
      setIsValidModel(false);
      setModelLoadError(true);
      if (onError) {
        onError();
      }
    } else {
      setIsValidModel(true);
      setIsLoading(true);
    }
  }, [modelUrl, onError]);

  const handleModelError = () => {
    console.error('Error loading model:', modelUrl);
    setModelLoadError(true);
    setIsLoading(false);
    if (onError) {
      onError();
    }
  };

  const handleModelLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full aspect-square bg-herb-50 rounded-lg overflow-hidden relative">
      {/* Loading indicator */}
      {isLoading && !modelLoadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-herb-50 bg-opacity-80 z-10">
          <div className="text-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-600 mx-auto mb-2"></div>
            <p className="text-herb-600">Loading 3D model...</p>
          </div>
        </div>
      )}
      
      {/* Error message */}
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
      
      {/* Only render Canvas if we have a valid model URL */}
      {!modelLoadError && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          shadows
          onCreated={() => {
            setTimeout(handleModelLoad, 1000); // Assume loading complete after 1 second
          }}
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
