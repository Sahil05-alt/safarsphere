import { destinations } from '../../data/destinations';
import { siteImages } from '../../data/siteImages';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import DestinationCard3D from '../three/DestinationCard3D';
const span = { lg: 'md:col-span-2 md:row-span-2', md: 'md:col-span-1 md:row-span-1', sm: 'md:col-span-1' };
export default function Destinations() {
  return (
    <section id="destinations" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Destinations" title="Where the road begins" text="Varanasi at the heart, and the sacred north around it." />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[260px]">
          {destinations.map((d, i) => (
            <Reveal key={d.id} i={i} className={span[d.size]}>
              <DestinationCard3D dest={d} image={siteImages.destinations[d.id]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
