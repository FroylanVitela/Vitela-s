const { Schema } = require('mongoose');

const QuantityRangeSchema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, default: null }
}, { _id: false });

const PriceTierSchema = new Schema({
  range: { type: QuantityRangeSchema, required: true },
  price: { type: Number, required: true }
}, { _id: false });

module.exports = { QuantityRangeSchema, PriceTierSchema };