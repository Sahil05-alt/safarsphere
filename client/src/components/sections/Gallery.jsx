import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteImages } from '../../data/siteImages';
import SectionHead from '../ui/SectionHead';
import SmartImage from '../ui/SmartImage';
const imgs = siteImages.gallery;

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const step = useCallback((d) => setOpen((i) => (i + d + imgs.length) % imgs.length), []);
  useEffect(() => {
    if (open === null) return;
    const k = (e) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [open, step]);
  return (
    <section id="gallery" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Gallery" title="Frames from the road" />
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {imgs.map((im, i) => (
            <button key={im.src} onClick={() => setOpen(i)} className="mb-3 md:mb-4 block w-full break-inside-avoid rounded-xl overflow-hidden" aria-label={`Open ${im.alt}`}>
              <SmartImage src={im.src} alt={im.alt} w={im.w} h={im.h} style={{ aspectRatio: `${im.w}/${im.h}` }} />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="fixed inset-0 z-[70] bg-black/95 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div key={open} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.4}
              onDragEnd={(_, i) => { if (i.offset.x < -80) step(1); else if (i.offset.x > 80) step(-1); }}
              initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="w-[94vw] max-w-4xl">
              <SmartImage src={imgs[open].src} alt={imgs[open].alt} w={imgs[open].w} h={imgs[open].h} className="w-full max-h-[80svh]" style={{ aspectRatio: `${imgs[open].w}/${imgs[open].h}`, maxHeight: '80svh', margin: '0 auto' }} imgClass="!object-contain" />
            </motion.div>
            <button aria-label="Close" onClick={() => setOpen(null)} className="absolute top-3 right-3 h-11 w-11 text-3xl" style={{ marginTop: 'var(--safe-t)' }}>×</button>
            <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }} className="hidden md:block absolute left-4 h-11 w-11 text-3xl">‹</button>
            <button aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }} className="hidden md:block absolute right-4 h-11 w-11 text-3xl">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
