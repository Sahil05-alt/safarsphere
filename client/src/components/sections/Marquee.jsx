import { marqueeItems } from '../../data/destinations';
// CSS-only infinite scroll (list duplicated for a seamless loop)
export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="border-y border-s3 bg-s1 py-5 overflow-hidden" aria-hidden>
      <div className="marquee">
        {row.map((t, i) => <span key={i} className="mx-8 font-display text-2xl md:text-3xl text-mute whitespace-nowrap">{t}<span className="mx-8" style={{ color: 'var(--accent)' }}>✦</span></span>)}
      </div>
    </div>
  );
}
