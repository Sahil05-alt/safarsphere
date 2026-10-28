import { useEffect, useRef } from 'react';
// Shared normalized pointer/tilt vector (-1..1) in a ref. Desktop mouse or mobile gyro; no re-renders.
export default function useMouseParallax(enabled = true) {
  const v = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) return;
    const mm = (e) => { v.current.x = (e.clientX / innerWidth) * 2 - 1; v.current.y = (e.clientY / innerHeight) * 2 - 1; };
    addEventListener('pointermove', mm, { passive: true });
    return () => removeEventListener('pointermove', mm);
  }, [enabled]);
  return v;
}
