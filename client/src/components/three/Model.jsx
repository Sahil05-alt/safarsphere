import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center } from '@react-three/drei';
import { siteImages } from '../../data/siteImages';
// Optional: upload a .glb to /public/models/ and set siteImages.model. Render <Model /> anywhere lazily.
function Gltf({ url }) { const { scene } = useGLTF(url); return <Center><primitive object={scene} /></Center>; }
export default function Model({ url = siteImages.model, className = 'h-72 w-full' }) {
  if (!url) return null;

  return (
    <div className={className}>
      <Canvas dpr={[1, 1.5]} frameloop="demand" camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={1.2} /><directionalLight position={[3, 4, 2]} intensity={1.5} />
        <Suspense fallback={null}><Gltf url={url} /></Suspense><OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}
