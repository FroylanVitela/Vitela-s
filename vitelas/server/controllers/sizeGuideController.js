const SizeGuide = require('../models/SizeGuide');

exports.getAll = async (req, res) => {
  try {
    const guides = await SizeGuide.find();
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const guide = await SizeGuide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Size guide not found' });
    res.json(guide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const guide = new SizeGuide(req.body);
    await guide.save();
    res.status(201).json(guide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const guide = await SizeGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guide) return res.status(404).json({ message: 'Size guide not found' });
    res.json(guide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const guide = await SizeGuide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Size guide not found' });
    res.json({ message: 'Size guide deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};