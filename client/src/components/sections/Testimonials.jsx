import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import SectionHead from '../ui/SectionHead';
// Swipe carousel: drag on touch/mouse, dots + arrows for a11y
export default function Testimonials() {
  const [i, setI] = useState(0); const n = testimonials.length; const t0 = useRef(0);
  const go = (d) => setI((v) => (v + d + n) % n);
  return (
    <section className="section bg-s1">
      <div className="container-x">
        <SectionHead eyebrow="Guest notes" title="In their words" text="Placeholder reviews. Replace with real, consented reviews in src/data/testimonials.js." />
        <motion.div key={i} className="card p-8 md:p-12 max-w-3xl touch-pan-y" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.3}
          onDragEnd={(_, p) => { if (p.offset.x < -70) go(1); else if (p.offset.x > 70) go(-1); }}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .4 }}>
          <p className="font-display text-xl md:text-2xl leading-relaxed">“{testimonials[i].text}”</p>
          <p className="mt-6 text-sm text-mute">{testimonials[i].name} · {testimonials[i].place}</p>
        </motion.div>
        <div className="flex items-center gap-2 mt-6">
          <button aria-label="Previous" onClick={() => go(-1)} className="h-11 w-11 rounded-full border border-line">‹</button>
          <button aria-label="Next" onClick={() => go(1)} className="h-11 w-11 rounded-full border border-line">›</button>
          <div className="flex gap-2 ml-3">{testimonials.map((_, k) => <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className="h-11 w-5 grid place-items-center"><i className="h-2 w-2 rounded-full" style={{ background: k === i ? 'var(--accent)' : '#343434' }} /></button>)}</div>
        </div>
      </div>
    </section>
  );
}
