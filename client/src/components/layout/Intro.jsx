import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Short intro (<1.5s total)
export default function Intro() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('ss_intro'));
  useEffect(() => { if (!show) return; const t = setTimeout(() => { sessionStorage.setItem('ss_intro', '1'); setShow(false); }, 1100); return () => clearTimeout(t); }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-bg" exit={{ opacity: 0 }} transition={{ duration: .4 }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="text-center">
            <div className="font-deva text-5xl" style={{ color: 'var(--accent)' }}>सफ़र</div>
            <div className="eyebrow mt-3">Safar Sphere</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
