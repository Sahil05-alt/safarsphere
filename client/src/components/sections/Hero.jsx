import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteImages } from '../../data/siteImages';
import { site } from '../../data/siteConfig';
import useDevice from '../../hooks/useDevice';
import useInView from '../../hooks/useInView';
import SmartImage from '../ui/SmartImage';
import Magnetic from '../ui/Magnetic';
const HeroScene = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  const { canUse3D: has3D, reduced, isMobile } = useDevice();
  const canUse3D = has3D && !isMobile; // no 3D globe on phones
  const [wrap, inView] = useInView({ rootMargin: '0px' });
  const [idx, setIdx] = useState(0);
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const fade = useTransform(scrollY, [0, 600], [1, 0]);
  const slides = siteImages.hero;

  useEffect(() => {
    if (reduced || !inView) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [reduced, inView, slides.length]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    inView ? v.play().catch(() => {}) : v.pause();
  }, [inView]);

  return (
    <section ref={wrap} id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden">
      <motion.div className="absolute inset-0" style={reduced ? {} : { y }}>
        {siteImages.heroVideo ? (
          <video ref={videoRef} src={siteImages.heroVideo} poster={siteImages.heroPoster} muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
        ) : (
          slides.map((s, i) => (
            <div key={s.src} className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
              <SmartImage src={s.src} alt={s.alt} w={s.w} h={s.h} priority={i === 0} className="h-full w-full" />
            </div>
          ))
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/30 to-bg" />

      {canUse3D && inView && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-[1] opacity-90"><HeroScene /></div>
        </Suspense>
      )}

      <motion.div style={reduced ? {} : { opacity: fade }} className="relative z-10 container-x h-full flex flex-col justify-end pb-24 md:pb-28">
        <p className="eyebrow mb-5">Varanasi · Est. PLACEHOLDER</p>
        <h1 className="h-xl max-w-4xl">
          {site.heroLines.map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? 'italic' : ''}`}
                style={i === 1 ? { color: 'var(--accent)' } : {}}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }} className="mt-8 flex flex-wrap gap-3">
          <Magnetic><a href="#packages" className="btn btn-solid">Explore Packages</a></Magnetic>
          <Magnetic><a href="#plan" className="btn">Plan My Trip</a></Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}