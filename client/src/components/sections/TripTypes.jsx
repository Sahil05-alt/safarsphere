import { tripTypes } from '../../data/services';
import { siteImages } from '../../data/siteImages';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import SmartImage from '../ui/SmartImage';
export default function TripTypes() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead eyebrow="Trip types" title="Travel your way" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {tripTypes.map((t, i) => (
            <Reveal key={t.id} i={i}>
              <a href="#plan" className="relative block aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden group">
<div className="absolute inset-0"><SmartImage src={siteImages.tripTypes[t.id]} alt={t.title} w={700} h={600} className="h-full w-full" imgClass="group-hover:scale-105 group-active:scale-105" /></div>                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-xl md:text-2xl">{t.title}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
