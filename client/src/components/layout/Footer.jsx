import { site, nav } from '../../data/siteConfig';
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-s3 bg-s1 pt-16 pb-28" style={{ paddingBottom: 'calc(7rem + var(--safe-b))' }}>
      <div aria-hidden className="pointer-events-none select-none absolute inset-x-0 -bottom-10 text-center font-deva leading-none" style={{ fontSize: 'clamp(9rem, 35vw, 28rem)', color: 'var(--accent)', opacity: .06 }}>सफ़र</div>
      <div className="container-x relative grid gap-10 md:grid-cols-3">
        <div><h3 className="font-display text-2xl mb-3">{site.name}</h3><p className="text-mute text-sm max-w-xs">{site.tagline}</p></div>
        <div className="text-sm text-mute space-y-2"><p className="eyebrow mb-2">Explore</p>{nav.map((n) => <a key={n.href} href={n.href} className="block py-1 hover:text-ink">{n.label}</a>)}</div>
        <div className="text-sm text-mute space-y-2"><p className="eyebrow mb-2">Contact (placeholder)</p><p>{site.address}</p><p>{site.phone}</p><p>{site.email}</p></div>
      </div>
      <p className="container-x relative mt-12 text-xs text-line">© {new Date().getFullYear()} {site.name}. Prices and details on this site are indicative.</p>
    </footer>
  );
}
