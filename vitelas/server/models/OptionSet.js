const { Schema, model } = require('mongoose');

const OptionSchema = new Schema({
  value: { type: String, required: true },
  code: { type: String },
  meta: { type: Schema.Types.Mixed }
}, { _id: false });

const OptionSetSchema = new Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  options: { type: [OptionSchema], default: [] }
}, { timestamps: true });

module.exports = model('OptionSet', OptionSetSchema);
