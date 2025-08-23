const OptionSet = require('../models/OptionSet');

exports.getAll = async (req, res) => {
  try {
    const sets = await OptionSet.find();
    res.json(sets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const set = await OptionSet.findById(req.params.id);
    if (!set) return res.status(404).json({ message: 'Option set not found' });
    res.json(set);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const set = new OptionSet(req.body);
    await set.save();
    res.status(201).json(set);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const set = await OptionSet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!set) return res.status(404).json({ message: 'Option set not found' });
    res.json(set);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const set = await OptionSet.findByIdAndDelete(req.params.id);
    if (!set) return res.status(404).json({ message: 'Option set not found' });
    res.json({ message: 'Option set deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};