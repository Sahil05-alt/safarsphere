import Reveal from './Reveal';
export default function SectionHead({ eyebrow, title, text }) {
  return (
    <div className="mb-10 md:mb-16 max-w-2xl">
      <Reveal><p className="eyebrow mb-3">{eyebrow}</p></Reveal>
      <Reveal i={1}><h2 className="h-lg">{title}</h2></Reveal>
      {text && <Reveal i={2}><p className="mt-4 text-mute leading-relaxed">{text}</p></Reveal>}
    </div>
  );
}
