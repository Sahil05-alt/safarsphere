import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { lsGet, lsSet, waLink } from '../../utils/helpers';
import TripPlanner from './TripPlanner';
import { streamChat } from './streamChat';

const CHIPS = ['Plan a 3-day Kashi trip', 'Best time for Kedarnath?', 'काशी में क्या देखें?', 'Family trip ideas'];
const KEY = 'ss_ai_history';
const WELCOME = { role: 'assistant', content: 'Namaste! I\'m Safar AI. Ask me about Varanasi, Ayodhya, Prayagraj, Nainital, Kedarnath, Char Dham or Kashmir. Hindi, English or Hinglish all work.' };

export default function SafarAI({ onClose }) {
  const [msgs, setMsgs] = useState(() => lsGet(KEY, [WELCOME]));
  const [input, setInput] = useState(''); const [busy, setBusy] = useState(false); const [tab, setTab] = useState('chat');
  const end = useRef(null); const abort = useRef(null);
  useEffect(() => { lsSet(KEY, msgs.slice(-30)); end.current?.scrollIntoView({ block: 'end' }); }, [msgs, tab]);
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; abort.current?.abort(); }; }, []);

  const send = async (text, mode = 'chat') => {
    const q = text.trim(); if (!q || busy) return;
    const next = [...msgs, { role: 'user', content: q }, { role: 'assistant', content: '' }];
    setMsgs(next); setInput(''); setBusy(true); setTab('chat');
    abort.current = new AbortController();
    try {
      await streamChat({ messages: next.slice(0, -1).slice(-12), mode, signal: abort.current.signal,
        onChunk: (c) => setMsgs((m) => { const copy = [...m]; copy[copy.length - 1] = { role: 'assistant', content: copy[copy.length - 1].content + c }; return copy; }) });
    } catch (e) {
      if (e.name !== 'AbortError') setMsgs((m) => { const copy = [...m]; copy[copy.length - 1] = { role: 'assistant', content: e.friendly || 'Safar AI is resting for a moment. Please try again, or message us on WhatsApp.' }; return copy; });
    } finally { setBusy(false); }
  };
  const lastUser = [...msgs].reverse().find((m) => m.role === 'user')?.content || 'a trip';
  const clear = () => { setMsgs([WELCOME]); lsSet(KEY, [WELCOME]); };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="fixed z-[80] inset-0 md:inset-auto md:right-6 md:bottom-6 md:w-[400px] md:h-[620px] flex flex-col bg-s1 md:rounded-2xl md:border md:border-line md:shadow-2xl overflow-hidden" role="dialog" aria-label="Safar AI chat">
      <header className="flex items-center justify-between px-4 border-b border-s3" style={{ paddingTop: 'max(.5rem, var(--safe-t))', minHeight: 56 }}>
        <div className="flex gap-1">
          {['chat', 'plan'].map((t) => <button key={t} onClick={() => setTab(t)} className="h-11 px-4 text-sm rounded-full" style={tab === t ? { background: 'var(--accent)', color: '#080808' } : { color: '#B8B8B8' }}>{t === 'chat' ? 'Chat' : 'Trip Planner'}</button>)}
        </div>
        <div className="flex"><button onClick={clear} className="h-11 px-3 text-xs text-mute">Clear</button><button onClick={onClose} aria-label="Close" className="h-11 w-11 text-2xl">×</button></div>
      </header>
      {tab === 'plan' ? <TripPlanner onSubmit={(p) => send(p, 'plan')} busy={busy} /> : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[88%] whitespace-pre-wrap text-sm leading-relaxed rounded-2xl px-4 py-3 ${m.role === 'user' ? 'ml-auto bg-s3' : 'bg-s2 border border-s3'}`}>{m.content || (busy && i === msgs.length - 1 ? '…' : '')}</div>
            ))}
            {msgs.length <= 1 && <div className="flex flex-wrap gap-2 pt-2">{CHIPS.map((c) => <button key={c} onClick={() => send(c)} className="px-3 min-h-[44px] rounded-full border border-line text-xs text-mute hover:text-ink">{c}</button>)}</div>}
            <div ref={end} />
          </div>
          <a href={waLink(`Hi, I used Safar AI and want to plan: ${lastUser}`)} target="_blank" rel="noreferrer" className="mx-4 mb-2 btn text-xs">Plan on WhatsApp</a>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 p-3 border-t border-s3" style={{ paddingBottom: 'max(.75rem, var(--safe-b))' }}>
            <input value={input} maxLength={500} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your trip…" className="flex-1 min-h-[44px] rounded-full bg-s2 border border-line px-4 text-sm outline-none" />
            <button disabled={busy || !input.trim()} className="btn btn-solid px-5 disabled:opacity-40">Send</button>
          </form>
        </>
      )}
    </motion.div>
  );
}
