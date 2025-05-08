
import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import { Suspense } from 'react';

interface ModelViewerProps {
  modelUrl: string;
}

// Model component with error handling
const Model = ({ modelUrl }: { modelUrl: string }) => {
  const [error, setError] = useState<string | null>(null);
  
  // Handle loading errors
  try {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} dispose={null} />;
  } catch (err) {
    if (!error) {
      console.error("Error loading model:", err);
      setError(`Failed to load model: ${err instanceof Error ? err.message : String(err)}`);
    }
    return (
      <Html>
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error || "Error loading model"}
        </div>
      </Html>
    );
  }
};

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Validate model URL and file extension
  const isValidModelUrl = () => {
    if (!modelUrl) return false;
    // Check if URL ends with a common 3D model format extension
    return /\.(glb|gltf|obj|fbx)$/i.test(modelUrl);
  };

  const handlePointerDown = () => {
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="w-full h-96 bg-herb-50 rounded-lg overflow-hidden relative">
      {!isValidModelUrl() ? (
        <div className="absolute inset-0 flex items-center justify-center text-herb-500">
          No valid 3D model available
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
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
