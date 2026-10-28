import { useEffect, useState } from 'react';
const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;
const hasWebGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } };
export function getDevice() {
  const isMobile = mq('(max-width: 767px)') || mq('(pointer: coarse)');
  const reduced = mq('(prefers-reduced-motion: reduce)');
  const lowEnd = (navigator.hardwareConcurrency || 8) <= 4;
  const webgl = hasWebGL();
  return {
    isMobile,
    reduced,
    lowEnd,
    webgl,
    canUse3D: webgl && !reduced && !lowEnd,
    canHover: mq('(hover: hover) and (pointer: fine)')
  };
}
export default function useDevice() {
  const [d, setD] = useState(() => (typeof window === 'undefined' ? { canUse3D: false } : getDevice()));
  useEffect(() => { setD(getDevice()); }, []);
  return d;
}
