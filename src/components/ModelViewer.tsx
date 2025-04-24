
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types";

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const gltf = useGLTF(url) as GLTFResult;
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive 
        object={gltf.scene} 
        scale={2} 
        position={[0, -1, 0]} 
      />
    </group>
  );
}

interface ModelViewerProps {
  modelUrl: string;
  onError?: () => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, onError }) => {
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
          <Environment preset="sunset" />
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
