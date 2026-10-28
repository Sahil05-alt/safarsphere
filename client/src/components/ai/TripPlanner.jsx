import { useState } from 'react';
const INTERESTS = ['Temples', 'Food', 'Nature', 'History', 'Photography', 'Adventure'];
const field = 'w-full min-h-[44px] rounded-xl bg-s2 border border-line px-4 text-sm outline-none';
// Mini AI Trip Planner: builds a prompt; server returns a day-by-day itinerary (no prices invented)
export default function TripPlanner({ onSubmit, busy }) {
  const [dest, setDest] = useState('Varanasi'); const [days, setDays] = useState(3); const [budget, setBudget] = useState('Mid-range'); const [likes, setLikes] = useState(['Temples']);
  const toggle = (i) => setLikes((l) => (l.includes(i) ? l.filter((x) => x !== i) : [...l, i]));
  return (
    <form className="flex-1 overflow-y-auto p-4 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(`Plan a ${days}-day trip to ${dest}. Budget level: ${budget}. Interests: ${likes.join(', ') || 'general'}. Give a day-by-day itinerary.`); }}>
      <label className="block text-xs text-mute">Destination<input className={`${field} mt-1`} value={dest} maxLength={60} onChange={(e) => setDest(e.target.value)} /></label>
      <label className="block text-xs text-mute">Days: {days}<input type="range" min="1" max="10" value={days} onChange={(e) => setDays(+e.target.value)} className="w-full mt-2 accent-[#B49A6C]" /></label>
      <label className="block text-xs text-mute">Budget level<select className={`${field} mt-1`} value={budget} onChange={(e) => setBudget(e.target.value)}>{['Budget', 'Mid-range', 'Premium', 'Luxury'].map((b) => <option key={b}>{b}</option>)}</select></label>
      <div><p className="text-xs text-mute mb-2">Interests</p><div className="flex flex-wrap gap-2">{INTERESTS.map((i) => <button type="button" key={i} onClick={() => toggle(i)} className="px-3 min-h-[44px] rounded-full border text-xs" style={likes.includes(i) ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : { borderColor: '#343434', color: '#B8B8B8' }}>{i}</button>)}</div></div>
      <button disabled={busy} className="btn btn-solid w-full disabled:opacity-40">Create itinerary</button>
    </form>
  );
}
