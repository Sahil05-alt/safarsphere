import { lazy, Suspense } from 'react';
import { featuredEvent as ev, otherEvents } from '../../data/events';
import { siteImages } from '../../data/siteImages';
import { waLink } from '../../utils/helpers';
import useDevice from '../../hooks/useDevice';
import useInView from '../../hooks/useInView';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import SmartImage from '../ui/SmartImage';
const FloatingLanterns = lazy(() => import('../three/FloatingLanterns'));

export default function Events() {
  const { canUse3D } = useDevice(); const [ref, inView] = useInView();
  return (
    <section id="events" ref={ref} className="section relative overflow-hidden">
      {canUse3D && inView && <Suspense fallback={null}><div className="absolute inset-0 pointer-events-none"><FloatingLanterns /></div></Suspense>}
      <div className="container-x relative">
        <SectionHead eyebrow="What's on" title="Moments worth travelling for" />
        <Reveal>
          <article className="card overflow-hidden grid md:grid-cols-2">
            <SmartImage src={siteImages.events[ev.image]} alt={ev.title} w={1000} h={800} className="min-h-[260px]" />
            <div className="p-7 md:p-10">
              <p className="font-deva text-2xl" style={{ color: 'var(--accent)' }}>{ev.hindi}</p>
              <h3 className="h-lg mt-1">{ev.title}</h3>
              <p className="text-sm text-mute mt-2">{ev.date}</p>
              <p className="mt-4 text-mute">{ev.blurb}</p>
              <div className="flex flex-wrap gap-2 mt-6">{ev.tiers.map((t) => <span key={t.name} className="px-4 py-2 rounded-full border border-line text-sm">{t.name} · {t.price == null ? 'On request' : `₹${t.price}`}</span>)}</div>
              <a className="btn btn-solid mt-8" target="_blank" rel="noreferrer" href={waLink(`Hi, I'd like details for ${ev.title}.`)}>Enquire</a>
            </div>
          </article>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3 mt-4">{otherEvents.map((e, i) => <Reveal key={e.title} i={i}><div className="card p-5"><h4 className="font-display text-lg">{e.title}</h4><p className="text-sm text-mute mt-1">{e.date}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}
