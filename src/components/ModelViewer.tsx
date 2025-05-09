
import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

interface ModelViewerProps {
  modelUrl: string;
}

// Model component with error handling
const Model = ({ modelUrl }: { modelUrl: string }) => {
  const [error, setError] = useState<string | null>(null);
  
  try {
    // Use useLoader with error handling
    const gltf = useLoader(GLTFLoader, modelUrl, undefined, (err) => {
      console.error("Model loading failed:", err);
      setError(`Failed to load model: ${err.message}`);
    });
    
    if (error) {
      return (
        <Html>
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        </Html>
      );
    }
    
    return <primitive object={gltf.scene} scale={1.5} />;
  } catch (err) {
    // Handle any other errors
    if (!error) {
      console.error("Error loading model:", err);
      setError(`Failed to load model: ${err instanceof Error ? err.message : String(err)}`);
    }
    
    return (
      <Html>
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error || "Error loading 3D model"}
        </div>
      </Html>
    );
  }
};

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if model URL is valid before trying to load it
  const isValidModelUrl = () => {
    if (!modelUrl) return false;
    
    // Make sure it's a local path or absolute URL
    if (!modelUrl.startsWith('/') && !modelUrl.startsWith('http')) {
      console.error("Invalid model URL format:", modelUrl);
      return false;
    }
    
    // Check file extension
    return /\.(glb|gltf)$/i.test(modelUrl);
  };

  const handlePointerDown = () => {
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-herb-50 rounded-lg overflow-hidden relative">
      {!isValidModelUrl() ? (
        <div className="absolute inset-0 flex items-center justify-center text-herb-500 flex-col">
          <div className="mb-2">No valid 3D model available</div>
          <div className="text-xs text-gray-400">
            ({modelUrl ? `Invalid format: ${modelUrl}` : 'No URL provided'})
          </div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-700"></div>
            </div>
          )}
          
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} onPointerDown={handlePointerDown}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Model modelUrl={modelUrl} />
              <Environment preset="sunset" />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={false}
              />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-2 right-2 text-xs text-herb-500 bg-white/70 px-2 py-1 rounded">
            Drag to rotate • Scroll to zoom
          </div>
        </>
      )}
    </div>
  );
};

export default ModelViewer;
