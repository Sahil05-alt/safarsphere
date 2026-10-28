import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useDevice from './hooks/useDevice';
import Intro from './components/layout/Intro';
import CursorGlow from './components/ui/CursorGlow';
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const loc = useLocation(); const { reduced } = useDevice();
  return (
    <>
      <Intro /><CursorGlow />
      <AnimatePresence mode="wait">
        <motion.div key={loc.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
          <Suspense fallback={<div className="min-h-[100svh] bg-bg" />}>
            <Routes location={loc}><Route path="/" element={<Home />} /><Route path="*" element={<NotFound />} /></Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
