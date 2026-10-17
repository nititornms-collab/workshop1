import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plant_care_db';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'development-secret-change-me',
  resave: false, saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGODB_URI, collectionName: 'sessions' }),
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 8 }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ error: err.message });
  if (err.code === 11000) return res.status(409).json({ error: 'ข้อมูลซ้ำในระบบ' });
  res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์ กรุณาตรวจสอบ MongoDB และข้อมูลที่ส่ง' });
});

mongoose.connect(MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Plant Care System running at http://localhost:${PORT}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
