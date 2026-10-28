import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRoute from './routes/ai.js';
import enquiryRoute from './routes/enquiry.js';
import { errorHandler } from './middleware/errors.js';

const app = express();
app.set('trust proxy', 1); // needed behind Render's proxy for rate limiting
const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '20kb' }));
app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/ai', aiRoute);
app.use('/api/enquiry', enquiryRoute);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Safar server on :${port}`));
