import { services } from '../../data/services';
import { siteImages } from '../../data/siteImages';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import SmartImage from '../ui/SmartImage';
export default function Services() {
  return (
    <section id="services" className="section bg-s1">
      <div className="container-x">
        <SectionHead eyebrow="Services" title="Everything on the ground" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} i={i}>
              <div className="card overflow-hidden h-full group">
                <SmartImage src={siteImages.services[s.id]} alt={s.title} w={600} h={420} className="aspect-[4/3]" imgClass="group-hover:scale-105" />
                <div className="p-5"><div className="text-2xl mb-2">{s.icon}</div><h3 className="text-xl mb-1">{s.title}</h3><p className="text-sm text-mute">{s.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
