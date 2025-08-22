const { Schema, model } = require('mongoose');
const { PriceTierSchema } = require('../utils/range');

const VariantSchema = new Schema({
  sku: { type: String, index: true },
  name: { type: String, required: true },
  attributes: { type: Schema.Types.Mixed },
  priceTiers: { type: [PriceTierSchema], default: [] },
  active: { type: Boolean, default: true }
});

const ProductSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  description: { type: String },
  materials: [{ type: String }],
  finishes: [{ type: String }],
  customization: {
    printableAreas: [{ type: String }],
    doubleSidedSupported: { type: Boolean, default: false },
    technique: [{ type: String }]
  },
  variants: { type: [VariantSchema], default: [] },
  media: {
    images: [{ type: String }]
  },
  tags: [{ type: String }],
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = model('Product', ProductSchema);