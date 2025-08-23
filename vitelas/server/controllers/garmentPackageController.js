const GarmentPackage = require('../models/GarmentPackage');

exports.getAll = async (req, res) => {
  try {
    const packages = await GarmentPackage.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const pkg = await GarmentPackage.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Garment package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const pkg = new GarmentPackage(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const pkg = await GarmentPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) return res.status(404).json({ message: 'Garment package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const pkg = await GarmentPackage.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Garment package not found' });
    res.json({ message: 'Garment package deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};