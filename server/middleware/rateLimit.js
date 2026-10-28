import rateLimit from 'express-rate-limit';
export const aiLimiter = rateLimit({ windowMs: 60_000, max: 12, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many messages. Please wait a minute and try again.' } });
export const enquiryLimiter = rateLimit({ windowMs: 10 * 60_000, max: 8, message: { error: 'Too many enquiries. Please try later.' } });
