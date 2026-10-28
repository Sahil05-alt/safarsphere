import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';
import { aiLimiter } from '../middleware/rateLimit.js';

const router = Router();
const MAX_CHARS = 500, MAX_MSGS = 12;
const SYSTEM = `You are Safar AI, a travel planner for Safar Sphere, a Varanasi-based travel house.
Cover Varanasi, Ayodhya, Prayagraj, Nainital, Kedarnath, Char Dham and Kashmir.
Reply in the user's language: English, Hindi or Hinglish.
Never invent prices, availability, discounts, phone numbers or reviews. If asked about pricing or booking, say the team shares exact details on WhatsApp and suggest tapping "Plan on WhatsApp".
For itineraries give a clear day-by-day structure (Day 1, Day 2...) with timing, places and practical tips. Mention that seasons, road and weather conditions change and should be checked before travel. Keep answers concise and warm.`;

router.post('/chat', aiLimiter, async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(503).json({ error: 'Safar AI is not configured yet. Please message us on WhatsApp.' });
    const { messages, mode } = req.body || {};
    if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: 'Please type a message.' });
    const clean = messages.filter((m) => m && typeof m.content === 'string' && m.content.trim()).slice(-MAX_MSGS)
      .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content.slice(0, MAX_CHARS * 2) }));
    const last = clean[clean.length - 1];
    if (!last || last.role !== 'user') return res.status(400).json({ error: 'Please type a message.' });
    if (last.content.length > MAX_CHARS) return res.status(400).json({ error: `Please keep messages under ${MAX_CHARS} characters.` });

    // Gemini history must start with a user turn
    const history = clean.slice(0, -1); while (history.length && history[0].role !== 'user') history.shift();
    const ai = new GoogleGenAI({ apiKey: key });
    const chat = ai.chats.create({
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      history: history.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
      config: {
        systemInstruction: SYSTEM + (mode === 'plan' ? '\nThe user used the Trip Planner: output only a day-by-day itinerary.' : ''),
      },
    });
    const result = await chat.sendMessageStream({ message: last.content });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); res.setHeader('Cache-Control', 'no-cache'); res.setHeader('X-Accel-Buffering', 'no');
    for await (const chunk of result) res.write(chunk.text || '');
    res.end();
  } catch (e) {
    console.error('AI error:', e.message);
    if (res.headersSent) return res.end('\n\n(Connection interrupted. Please try again.)');
    res.status(502).json({ error: 'Safar AI is resting for a moment. Please try again, or message us on WhatsApp.' });
  }
});
export default router;
