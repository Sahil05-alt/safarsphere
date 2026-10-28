// Reads a plain-text streamed response from POST /api/ai/chat
export async function streamChat({ messages, mode, signal, onChunk }) {
  const res = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages, mode }), signal });
  if (!res.ok || !res.body) {
    const err = new Error('AI error');
    try { err.friendly = (await res.json()).error; } catch { /* ignore */ }
    throw err;
  }
  const reader = res.body.getReader(); const dec = new TextDecoder();
  for (;;) { const { done, value } = await reader.read(); if (done) break; onChunk(dec.decode(value, { stream: true })); }
}
