import mongoose from 'mongoose';

const careLogSchema = new mongoose.Schema({
  plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
  activity: { type: String, enum: ['Watering', 'Fertilizing', 'Pruning', 'Repotting', 'Other'], required: true },
  performedBy: { type: String, trim: true, default: 'Team' },
  notes: { type: String, default: '' },
  performedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('CareLog', careLogSchema);
