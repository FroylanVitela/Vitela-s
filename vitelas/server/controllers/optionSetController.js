// controllers/optionSetController.js
const OptionSet = require('../models/OptionSet');

// pequeño helper para no repetir try/catch
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/option-sets
const listOptionSets = asyncHandler(async (req, res) => {
  const sets = await OptionSet.find({}).lean();
  res.json(sets);
});

// GET /api/option-sets/:id
const getOptionSetById = asyncHandler(async (req, res) => {
  const doc = await OptionSet.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: 'OptionSet no encontrado' });
  res.json(doc);
});

// POST /api/option-sets
const createOptionSet = asyncHandler(async (req, res) => {
  const created = await OptionSet.create(req.body);
  res.status(201).json(created);
});

// PUT /api/option-sets/:id
const updateOptionSet = asyncHandler(async (req, res) => {
  const updated = await OptionSet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) return res.status(404).json({ message: 'OptionSet no encontrado' });
  res.json(updated);
});

// DELETE /api/option-sets/:id
const deleteOptionSet = asyncHandler(async (req, res) => {
  const deleted = await OptionSet.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'OptionSet no encontrado' });
  res.status(204).end();
});

module.exports = {
  listOptionSets,
  getOptionSetById,
  createOptionSet,
  updateOptionSet,
  deleteOptionSet,
};
