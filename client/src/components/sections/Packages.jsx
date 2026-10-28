import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages, inclusionIcons } from '../../data/packages';
import { siteImages } from '../../data/siteImages';
import { waLink } from '../../utils/helpers';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import SmartImage from '../ui/SmartImage';
const price = (p) => (p == null ? 'Price on request' : `From ₹${p.toLocaleString('en-IN')}`);

export default function Packages() {
  const [sel, setSel] = useState(null);
  return (
    <section id="packages" className="section bg-s1">
      <div className="container-x">
        <SectionHead eyebrow="Packages" title="Curated journeys" text="Starting prices are shared on enquiry. Nothing here is a fixed quote." />
        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((p, i) => (
            <Reveal key={p.id} i={i}>
              <article className="card overflow-hidden h-full flex flex-col">
                <SmartImage src={siteImages.packages[p.image]} alt={p.title} w={900} h={600} className="aspect-[3/2]" />
                <div className="p-6 flex-1 flex flex-col">
                  <p className="eyebrow mb-2">{p.days}</p>
                  <h3 className="text-2xl mb-2">{p.title}</h3>
                  <p className="text-sm text-mute mb-4">{p.route.join(' → ')}</p>
                  <div className="flex gap-2 mb-4" aria-label="Inclusions">{p.inclusions.map((k) => <span key={k} title={k} className="h-9 w-9 grid place-items-center rounded-full bg-s2 border border-s3">{inclusionIcons[k]}</span>)}</div>
                  <p className="mt-auto mb-4 gold-price" style={{ color: 'var(--accent)' }}>{price(p.price)}</p>
                  <div className="flex gap-3 flex-wrap">
                    <button onClick={() => setSel(p)} className="btn">Details</button>
                    <a className="btn btn-solid" target="_blank" rel="noreferrer" href={waLink(`Hi, I'd like to enquire about the ${p.title} package.`)}>WhatsApp enquiry</a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-end md:place-items-center bg-black/70 p-0 md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}>
            <motion.div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }} className="card w-full md:max-w-lg p-6 max-h-[85svh] overflow-auto" style={{ paddingBottom: 'calc(1.5rem + var(--safe-b))' }}>
              <div className="flex justify-between items-start"><h3 className="text-2xl">{sel.title}</h3><button aria-label="Close" onClick={() => setSel(null)} className="h-11 w-11 -mt-2 -mr-2 text-2xl">×</button></div>
              <p className="eyebrow my-3">Places</p>
              <ul className="text-mute text-sm space-y-1">{sel.places.map((x) => <li key={x}>· {x}</li>)}</ul>
              <p className="eyebrow my-3">Includes</p>
              <p className="text-sm text-mute">{sel.inclusions.join(', ')}</p>
              <p className="text-sm text-mute mt-4">{sel.note}</p>
              <a className="btn btn-solid mt-6 w-full" target="_blank" rel="noreferrer" href={waLink(`Hi, please share details and pricing for ${sel.title}.`)}>Enquire on WhatsApp</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
