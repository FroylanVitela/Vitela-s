const { Schema, model } = require('mongoose');
const { PriceTierSchema } = require('../utils/range');

const GarmentPlanSchema = new Schema({
  planKey: { type: String, required: true },
  description: { type: String },
  technique: { type: String, enum: ['DTF', 'sublimación'], required: true },
  priceTiers: { type: [PriceTierSchema], default: [] }
}, { _id: false });

const GarmentPackageSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  garmentType: { type: String, required: true },
  audience: { type: String, enum: ['adult-men', 'adult-women', 'kids', 'unisex'], required: true },
  colorSetKey: { type: String },
  sizeGuideKey: { type: String },
  baseColorRestriction: { type: String },
  composition: { type: String },
  plans: { type: [GarmentPlanSchema], default: [] },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = model('GarmentPackage', GarmentPackageSchema);