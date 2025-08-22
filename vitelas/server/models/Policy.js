const { Schema, model } = require('mongoose');

const PolicySchema = new Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Policy', PolicySchema);