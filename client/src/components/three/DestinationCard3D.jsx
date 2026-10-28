import { useRef } from 'react';
import SmartImage from '../ui/SmartImage';
import useDevice from '../../hooks/useDevice';
import { waLink } from '../../utils/helpers';
// Desktop: cursor tilt + layered depth (CSS 3D, no WebGL canvas). Phones: gentle touch tilt.
export default function DestinationCard3D({ dest, image }) {
  const ref = useRef(null); const { reduced } = useDevice();
  const tilt = (e) => {
    if (reduced) return; const el = ref.current; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    el.style.setProperty('--px', `${x * 18}px`); el.style.setProperty('--py', `${y * 18}px`);
  };
  const reset = () => { const el = ref.current; el.style.transform = ''; el.style.setProperty('--px', '0px'); el.style.setProperty('--py', '0px'); };
  return (
    <a href={waLink(`Hi, I'd like to know more about trips to ${dest.name}.`)} target="_blank" rel="noreferrer"
      ref={ref} onPointerMove={tilt} onPointerLeave={reset} onPointerUp={reset}
      className="group relative block h-full min-h-[240px] rounded-2xl overflow-hidden transition-transform duration-200 ease-out" style={{ transformStyle: 'preserve-3d' }}>
      <div className="absolute inset-[-6%] transition-transform duration-200" style={{ transform: 'translate3d(calc(var(--px,0px) * -1), calc(var(--py,0px) * -1), 0)' }}>
        <SmartImage src={image} alt={dest.name} w={900} h={900} className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/20 to-transparent" />
      <div className="absolute bottom-0 p-5" style={{ transform: 'translateZ(40px) translate3d(var(--px,0px), var(--py,0px), 0)' }}>
        <p className="font-deva text-lg" style={{ color: 'var(--accent)' }}>{dest.hindi}</p>
        <h3 className="text-2xl md:text-3xl">{dest.name}</h3>
        <p className="text-sm text-mute mt-1 max-w-xs">{dest.blurb}</p>
      </div>
    </a>
  );
}
