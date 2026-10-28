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
const canUse3D = has3D && !isMobile;
  const [wrap, inView] = useInView({ rootMargin: '0px' });
  const [idx, setIdx] = useState(0); const [previousIdx, setPreviousIdx] = useState(null); const [sceneReady, setSceneReady] = useState(false); const videoRef = useRef(null);
  const slideIndex = useRef(0); const fadeTimer = useRef(null);
  const { scrollY } = useScroll(); const y = useTransform(scrollY, [0, 800], [0, 160]); const fade = useTransform(scrollY, [0, 600], [1, 0]);
  const slides = siteImages.hero;
  useEffect(() => {
    if (reduced || !inView) return;
    const t = setInterval(() => {
      const previous = slideIndex.current; const next = (previous + 1) % slides.length;
      slideIndex.current = next; setPreviousIdx(previous); setIdx(next);
      window.clearTimeout(fadeTimer.current); fadeTimer.current = window.setTimeout(() => setPreviousIdx(null), 1600);
    }, 6000);
    return () => { clearInterval(t); window.clearTimeout(fadeTimer.current); };
  }, [reduced, inView, slides.length]);
  useEffect(() => {
    if (!inView || reduced || slides.length < 2) return;
    const next = slides[(idx + 1) % slides.length];
    const timer = window.setTimeout(() => {
      const image = new Image(); image.decoding = 'async'; image.sizes = '100vw';
      image.srcset = `${next.src.replace(/\.webp$/i, '-640.webp')} 640w, ${next.src.replace(/\.webp$/i, '-1280.webp')} 1280w, ${next.src} 1600w`;
      image.src = next.src;
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [idx, inView, reduced, slides]);
  useEffect(() => {
    if (!canUse3D || !inView) return;
    let timer; let idleId;
    const start = () => setSceneReady(true);
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(start, { timeout: 1400 });
    else timer = window.setTimeout(start, 700);
    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      window.clearTimeout(timer);
    };
  }, [canUse3D, inView]);
  useEffect(() => { const v = videoRef.current; if (!v) return; inView ? v.play().catch(() => {}) : v.pause(); }, [inView]);
  return (
    <section ref={wrap} id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden">
      <motion.div className="absolute inset-0" style={reduced ? {} : { y }}>
        {siteImages.heroVideo ? (
          <video ref={videoRef} src={siteImages.heroVideo} poster={siteImages.heroPoster} muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
        ) : slides.map((s, i) => (i === idx || i === previousIdx) && (
          <div key={s.src} className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
            <SmartImage src={s.src} alt={s.alt} w={s.w} h={s.h} sizes="100vw" priority className="h-full w-full" />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/30 to-bg" />
      {canUse3D && !isMobile && inView && sceneReady && <Suspense fallback={null}><div className="absolute inset-0 z-[1] opacity-90"><HeroScene /></div></Suspense>}
      <motion.div style={reduced ? {} : { opacity: fade }} className="relative z-10 container-x h-full flex flex-col justify-end pb-24 md:pb-28">
        <p className="eyebrow mb-5">Varanasi · Est. PLACEHOLDER</p>
        <h1 className="h-xl max-w-4xl">
          {site.heroLines.map((l, i) => (
            <span key={l} className="block overflow-hidden"><motion.span className={`block ${i === 1 ? 'italic' : ''}`} style={i === 1 ? { color: 'var(--accent)' } : {}} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .6 + i * .15, ease: [.22, 1, .36, 1] }}>{l}</motion.span></span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: .6 }} className="mt-8 flex flex-wrap gap-3">
          <Magnetic><a href="#packages" className="btn btn-solid">Explore Packages</a></Magnetic>
          <Magnetic><a href="#plan" className="btn">Plan My Trip</a></Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
