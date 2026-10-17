import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Plant from '../models/Plant.js';
import CareLog from '../models/CareLog.js';
import User from '../models/User.js';

const router = Router();
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/stats', asyncHandler(async (_req, res) => {
  const [plants, logs, due] = await Promise.all([
    Plant.countDocuments(), CareLog.countDocuments(), Plant.countDocuments({ nextWatering: { $lte: new Date() } })
  ]);
  res.json({ plants, logs, due });
}));

router.get('/plants', asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.search) filter.$or = [
    { name: { $regex: req.query.search, $options: 'i' } },
    { species: { $regex: req.query.search, $options: 'i' } },
    { location: { $regex: req.query.search, $options: 'i' } }
  ];
  res.json(await Plant.find(filter).sort({ createdAt: -1 }).lean());
}));
router.post('/plants', asyncHandler(async (req, res) => {
  const plant = await Plant.create(req.body);
  res.status(201).json(plant);
}));
router.put('/plants/:id', asyncHandler(async (req, res) => {
  const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!plant) return res.status(404).json({ error: 'Plant not found' });
  res.json(plant);
}));
router.delete('/plants/:id', asyncHandler(async (req, res) => {
  const plant = await Plant.findByIdAndDelete(req.params.id);
  if (!plant) return res.status(404).json({ error: 'Plant not found' });
  await CareLog.deleteMany({ plant: plant._id });
  res.json({ message: 'Plant deleted' });
}));

router.get('/logs', asyncHandler(async (_req, res) => {
  res.json(await CareLog.find().populate('plant', 'name location').sort({ performedAt: -1 }).limit(100).lean());
}));
router.post('/logs', asyncHandler(async (req, res) => {
  const log = await CareLog.create(req.body);
  if (req.body.activity === 'Watering' && req.body.nextWatering) {
    await Plant.findByIdAndUpdate(req.body.plant, { nextWatering: req.body.nextWatering });
  }
  res.status(201).json(await log.populate('plant', 'name location'));
}));

router.post('/auth/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ error: 'กรอกข้อมูลให้ครบ และรหัสผ่านอย่างน้อย 6 ตัวอักษร' });
  if (await User.findOne({ email })) return res.status(409).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' });
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10) });
  req.session.user = { id: user.id, name: user.name, role: user.role };
  res.status(201).json({ user: req.session.user });
}));
router.post('/auth/login', asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() });
  if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  req.session.user = { id: user.id, name: user.name, role: user.role };
  res.json({ user: req.session.user });
}));
router.post('/auth/logout', (req, res) => req.session.destroy(() => res.json({ message: 'Logged out' })));
router.get('/auth/me', (req, res) => res.json({ user: req.session.user || null }));

export default router;
