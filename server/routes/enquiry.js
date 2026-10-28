import { Router } from 'express';
import { appendFile, mkdir } from 'node:fs/promises';
import { enquiryLimiter } from '../middleware/rateLimit.js';
const router = Router();
const s = (v, n) => String(v ?? '').trim().slice(0, n);
// Stores enquiries as JSON lines in server/data/enquiries.jsonl. Swap for MongoDB/email when ready.
router.post('/', enquiryLimiter, async (req, res, next) => {
  try {
    const b = req.body || {};
    const e = { name: s(b.name, 80), phone: s(b.phone, 20), destination: s(b.destination, 80), tripType: s(b.tripType, 30), travellers: s(b.travellers, 4), date: s(b.date, 12), message: s(b.message, 500), at: new Date().toISOString() };
    if (!e.name || !/^[+\d][\d\s-]{6,18}$/.test(e.phone)) return res.status(400).json({ error: 'Please enter a valid name and phone number.' });
    await mkdir('data', { recursive: true }); await appendFile('data/enquiries.jsonl', JSON.stringify(e) + '\n');
    res.json({ ok: true });
  } catch (err) { next(err); }
});
export default router;
