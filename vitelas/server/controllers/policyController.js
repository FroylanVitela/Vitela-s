// controllers/policyController.js
const Policy = require('../models/Policy');

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/policies
const listPolicies = asyncHandler(async (req, res) => {
  const items = await Policy.find({}).lean();
  res.json(items);
});

// GET /api/policies/:id
const getPolicyById = asyncHandler(async (req, res) => {
  const doc = await Policy.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: 'Policy no encontrada' });
  res.json(doc);
});

// POST /api/policies
const createPolicy = asyncHandler(async (req, res) => {
  const created = await Policy.create(req.body);
  res.status(201).json(created);
});

// PUT /api/policies/:id
const updatePolicy = asyncHandler(async (req, res) => {
  const updated = await Policy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updated) return res.status(404).json({ message: 'Policy no encontrada' });
  res.json(updated);
});

// DELETE /api/policies/:id
const deletePolicy = asyncHandler(async (req, res) => {
  const deleted = await Policy.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ message: 'Policy no encontrada' });
  res.status(204).end();
});

module.exports = {
  listPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
};
