import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { globeCities } from '../../data/destinations';
import { lonLatToVec3 } from '../../utils/helpers';
import useDevice from '../../hooks/useDevice';
import useMouseParallax from '../../hooks/useMouseParallax';

const GOLD = '#B49A6C';

function dottedSphere(n) {
  const a = new Float32Array(n * 3);
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = g * i;
    a.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3);
  }
  return a;
}

function Globe({ mouse, mobile, quality }) {
  const group = useRef();
  const dots = useRef([]);
  const pts = useMemo(() => dottedSphere(mobile ? 700 : Math.round(1800 * quality)), [mobile, quality]);
  const cities = useMemo(
    () => globeCities.map((c) => ({ ...c, p: new THREE.Vector3(...lonLatToVec3(c.lon, c.lat, 1.02)) })),
    []
  );
  const origin = cities.find((c) => c.origin);

  useFrame((s, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.08;
    const tx = mobile ? 0 : mouse.current.y * 0.25;
    g.rotation.x += (tx + 0.3 - g.rotation.x) * 0.05;
    const t = s.clock.elapsedTime;
    dots.current.forEach((m, i) => {
      if (m) m.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.35);
    });
  });

  const arcs = cities
    .filter((c) => !c.origin)
    .map((c) => {
      const mid = origin.p
        .clone()
        .add(c.p)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(1.0 + origin.p.distanceTo(c.p) * 0.55);
      return { key: c.name, start: origin.p, end: c.p, mid };
    });

  return (
    <group position={[0, mobile ? 0.9 : 0, 0]} scale={mobile ? 0.7 : 1.4}>
      <group ref={group}>
        {/* Dotted globe only. No solid sphere, so no black circle. */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pts, 3]} />
          </bufferGeometry>
          <pointsMaterial color={GOLD} size={0.012} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
        </points>

        {cities.map((c, i) => (
          <mesh key={c.name} position={c.p} ref={(m) => (dots.current[i] = m)}>
            <sphereGeometry args={[c.origin ? 0.028 : 0.018, 12, 12]} />
            <meshBasicMaterial color={c.origin ? '#F2F2F2' : GOLD} />
          </mesh>
        ))}

        {arcs.map((a) => (
          <QuadraticBezierLine key={a.key} start={a.start} end={a.end} mid={a.mid} color={GOLD} lineWidth={1} transparent opacity={0.6} />
        ))}
      </group>
    </group>
  );
}

function Particles({ mobile }) {
  const ref = useRef();
  const n = mobile ? 30 : 100;
  const pos = useMemo(() => {
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i++) a[i] = (Math.random() - 0.5) * 6;
    return a;
  }, [n]);
  useFrame((_, dt) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += dt * 0.02;
    p.position.y = (p.position.y + dt * 0.03) % 0.6;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.025} transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

export default function HeroScene() {
  const { isMobile } = useDevice();
  const mouse = useMouseParallax(!isMobile);
  const [q, setQ] = useState(1);
  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor onDecline={() => setQ(0.5)} flipflops={2}>
        <Globe mouse={mouse} mobile={isMobile} quality={q} />
        <Particles mobile={isMobile} />
      </PerformanceMonitor>
    </Canvas>
  );
}