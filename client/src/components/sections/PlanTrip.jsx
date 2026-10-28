import { useState } from 'react';
import { tripTypes } from '../../data/services';
import { waLink } from '../../utils/helpers';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
const init = { name: '', phone: '', destination: '', tripType: 'Spiritual', travellers: '2', date: '', message: '' };
const field = 'w-full min-h-[44px] rounded-xl bg-s2 border border-line px-4 py-3 text-sm outline-none focus:border-[var(--accent)]';

export default function PlanTrip() {
  const [f, setF] = useState(init); const [status, setStatus] = useState('idle');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const text = `Namaste! Trip enquiry via website.\nName: ${f.name}\nDestination: ${f.destination}\nType: ${f.tripType}\nTravellers: ${f.travellers}\nDate: ${f.date || 'Flexible'}\nNote: ${f.message}`;
  const submit = async (e) => {
    e.preventDefault(); setStatus('sending');
    try { await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) }); } catch { /* WhatsApp still opens */ }
    setStatus('done'); window.open(waLink(text), '_blank', 'noopener');
  };
  return (
    <section id="plan" className="section">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <SectionHead eyebrow="Plan my trip" title="Tell us where, we'll handle how" text="Submitting saves your enquiry and opens WhatsApp with the details pre-filled." />
        <Reveal>
          <form onSubmit={submit} className="card p-6 md:p-8 grid gap-4">
            <input required className={field} placeholder="Your name" value={f.name} onChange={set('name')} autoComplete="name" />
            <input required className={field} placeholder="Phone / WhatsApp" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" />
            <input className={field} placeholder="Destination (e.g. Varanasi, Kedarnath)" value={f.destination} onChange={set('destination')} />
            <div className="grid grid-cols-2 gap-4">
              <select className={field} value={f.tripType} onChange={set('tripType')}>{tripTypes.map((t) => <option key={t.id}>{t.title}</option>)}</select>
              <input className={field} type="number" min="1" max="100" value={f.travellers} onChange={set('travellers')} aria-label="Travellers" />
            </div>
            <input className={field} type="date" value={f.date} onChange={set('date')} aria-label="Travel date" />
            <textarea className={field} rows="3" maxLength={500} placeholder="Anything else?" value={f.message} onChange={set('message')} />
            <button className="btn btn-solid" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send & open WhatsApp'}</button>
            {status === 'done' && <p className="text-sm text-mute">Thank you. If WhatsApp didn't open, <a className="underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noreferrer" href={waLink(text)}>tap here</a>.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
