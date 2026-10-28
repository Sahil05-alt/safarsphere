import { useRef } from 'react';
import useDevice from '../../hooks/useDevice';
// Magnetic pull on desktop only.
export default function Magnetic({ children, strength = .25 }) {
  const ref = useRef(null); const { canHover, reduced } = useDevice();
  if (!canHover || reduced) return children;
  const move = (e) => { const r = ref.current.getBoundingClientRect(); ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px,${(e.clientY - r.top - r.height / 2) * strength}px)`; };
  const leave = () => { ref.current.style.transform = ''; };
  return <span ref={ref} onPointerMove={move} onPointerLeave={leave} className="inline-block transition-transform duration-200">{children}</span>;
}
