import { useEffect, useRef } from 'react';
import useDevice from '../../hooks/useDevice';
export default function CursorGlow() {
  const ref = useRef(null); const { canHover, reduced } = useDevice();
  useEffect(() => {
    if (!canHover || reduced) return;
    let raf; const mv = (e) => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { if (ref.current) ref.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }); };
    addEventListener('pointermove', mv, { passive: true }); return () => { removeEventListener('pointermove', mv); cancelAnimationFrame(raf); };
  }, [canHover, reduced]);
  return canHover && !reduced ? <div ref={ref} className="cursor-glow" aria-hidden /> : null;
}
