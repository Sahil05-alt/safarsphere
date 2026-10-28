import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useDevice from '../../hooks/useDevice';
// Rising diyas as one InstancedMesh (a single draw call)
function Lanterns({ count }) {
  const mesh = useRef(); const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => Array.from({ length: count }, () => ({ x: (Math.random() - 0.5) * 12, y: Math.random() * 8 - 4, z: -Math.random() * 4, s: 0.06 + Math.random() * 0.08, v: 0.15 + Math.random() * 0.25, ph: Math.random() * 6 })), [count]);
  useFrame((st, dt) => {
    const m = mesh.current; if (!m) return; const t = st.clock.elapsedTime;
    data.forEach((d, i) => { d.y += d.v * dt; if (d.y > 4.5) d.y = -4.5; dummy.position.set(d.x + Math.sin(t * 0.5 + d.ph) * 0.2, d.y, d.z); dummy.scale.setScalar(d.s); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); });
    m.instanceMatrix.needsUpdate = true;
  });
  useEffect(() => () => { mesh.current?.geometry.dispose(); mesh.current?.material.dispose(); }, []);
  return <instancedMesh ref={mesh} args={[null, null, count]}><coneGeometry args={[1, 1.2, 8]} /><meshBasicMaterial color="#B49A6C" transparent opacity={0.65} /></instancedMesh>;
}
export default function FloatingLanterns() {
  const { isMobile } = useDevice();
  return <Canvas dpr={isMobile ? 1 : [1, 1.5]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: false, alpha: true }}><Lanterns count={isMobile ? 18 : 60} /></Canvas>;
}
