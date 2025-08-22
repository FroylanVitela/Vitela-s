const { Schema, model } = require('mongoose');

const SizeRowSchema = new Schema({
  size: { type: String, required: true },
  chest: { type: Number },
  length: { type: Number },
  other: { type: Schema.Types.Mixed }
}, { _id: false });

const SizeGuideSchema = new Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  unit: { type: String, default: 'cm' },
  rows: { type: [SizeRowSchema], default: [] },
  notes: { type: String }
}, { timestamps: true });

module.exports = model('SizeGuide', SizeGuideSchema);