import { lazy, Suspense, useState } from 'react';
import { waLink } from '../../utils/helpers';
const SafarAI = lazy(() => import('../ai/SafarAI'));
export default function FloatingActions() {
  const [ai, setAi] = useState(false);
  return (
    <>
      <div className="fixed right-4 z-40 flex flex-col gap-3" style={{ bottom: 'calc(1rem + var(--safe-b))' }}>
        <button onClick={() => setAi(true)} aria-label="Open Safar AI" className="h-12 px-5 rounded-full bg-s2 border border-line text-sm flex items-center gap-2 shadow-lg" style={{ color: 'var(--accent)' }}>✦ <span>Safar AI</span></button>
        <a href={waLink('Namaste! I would like to enquire about a trip.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="h-12 px-5 rounded-full btn-solid flex items-center justify-center gap-2 text-sm font-medium shadow-lg" style={{ background: 'var(--accent)', color: '#080808' }}>WhatsApp</a>
      </div>
      {ai && <Suspense fallback={null}><SafarAI onClose={() => setAi(false)} /></Suspense>}
    </>
  );
}
