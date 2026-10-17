import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  species: { type: String, trim: true, default: '' },
  location: { type: String, required: true, trim: true },
  waterNeeds: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  sunlight: { type: String, enum: ['Low', 'Indirect', 'Direct'], default: 'Indirect' },
  nextWatering: { type: Date, default: null },
  notes: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Plant', plantSchema);
