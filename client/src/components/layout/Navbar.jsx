import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nav, site } from '../../data/siteConfig';
import Magnetic from '../ui/Magnetic';

const go = (e, href) => {
  e.preventDefault(); const el = document.querySelector(href); if (!el) return;
  window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 70), behavior: 'smooth' });
};
export default function Navbar() {
  const [solid, setSolid] = useState(() => window.scrollY > 40); const [open, setOpen] = useState(false);
  useEffect(() => {
    let tick = false; let wasSolid = window.scrollY > 40;
    const on = () => { if (tick) return; tick = true; requestAnimationFrame(() => { const next = window.scrollY > 40; if (next !== wasSolid) { wasSolid = next; setSolid(next); } tick = false; }); };
    addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? 'glass' : ''}`} style={{ paddingTop: 'var(--safe-t)' }}>
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-baseline gap-2 min-h-[44px] items-center">
          <span className="font-deva text-2xl" style={{ color: 'var(--accent)' }}>सफ़र</span><span className="font-display text-lg">{site.name}</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-mute">
          {nav.map((n) => <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="hover:text-ink transition-colors py-3">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block"><Magnetic><a href="#plan" onClick={(e) => go(e, '#plan')} className="btn btn-solid">Plan My Trip</a></Magnetic></span>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="lg:hidden h-11 w-11 grid place-items-center">
            <span className="block w-6 space-y-1.5"><i className={`block h-px bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} /><i className={`block h-px bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} /><i className={`block h-px bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} /></span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: .35 }}
            className="fixed inset-0 top-0 z-50 bg-bg lg:hidden flex flex-col p-8" style={{ paddingTop: 'calc(5rem + var(--safe-t))', paddingBottom: 'calc(2rem + var(--safe-b))' }}>
            <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-4 top-4 h-11 w-11 text-2xl">×</button>
            {nav.map((n, i) => (
              <motion.a key={n.href} href={n.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .08 * i }}
                onClick={(e) => { setOpen(false); setTimeout(() => go(e, n.href), 250); }} className="font-display text-3xl py-3 border-b border-s3">{n.label}</motion.a>
            ))}
            <a href="#plan" onClick={(e) => { setOpen(false); setTimeout(() => go(e, '#plan'), 250); }} className="btn btn-solid mt-8">Plan My Trip</a>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
