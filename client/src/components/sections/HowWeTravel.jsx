import { useEffect, useRef } from 'react';
import { timeline } from '../../data/services';
import SectionHead from '../ui/SectionHead';
// Vertical line draws as you scroll (scaleY = transform only)
export default function HowWeTravel() {
  const root = useRef(null);
  useEffect(() => {
    let disposed = false; let ctx;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
        if (disposed) return;
        const gsap = gsapModule.default; gsap.registerPlugin(triggerModule.ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo('.tl-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.tl-wrap', start: 'top 70%', end: 'bottom 70%', scrub: true } });
          gsap.utils.toArray('.tl-item').forEach((el) => gsap.from(el, { opacity: 0, x: 24, duration: .6, scrollTrigger: { trigger: el, start: 'top 80%' } }));
        }, root);
      });
    }, { rootMargin: '500px 0px' });
    if (root.current) observer.observe(root.current);
    return () => { disposed = true; observer.disconnect(); ctx?.revert(); };
  }, []);
  return (
    <section ref={root} className="section bg-s1">
      <div className="container-x">
        <SectionHead eyebrow="How we travel" title="From first message to last mile" />
        <div className="tl-wrap relative pl-8 md:pl-12 max-w-2xl">
          <span className="absolute left-0 top-0 h-full w-px bg-s3" />
          <span className="tl-line absolute left-0 top-0 h-full w-px" style={{ background: 'var(--accent)' }} />
          {timeline.map((s, i) => (
            <div key={s.t} className="tl-item relative pb-12 last:pb-0">
              <span className="absolute -left-[37px] md:-left-[53px] top-1 h-3 w-3 rounded-full" style={{ background: 'var(--accent)' }} />
              <p className="eyebrow mb-1">0{i + 1}</p><h3 className="text-2xl mb-1">{s.t}</h3><p className="text-mute">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
