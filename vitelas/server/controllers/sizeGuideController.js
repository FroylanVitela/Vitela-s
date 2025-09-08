// controllers/sizeGuideController.js
const SizeGuide = require('../models/SizeGuide');

// Wrapper para manejar errores async sin repetir try/catch
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/size-guides
const listSizeGuides = asyncHandler(async (req, res) => {
  // Si quieres filtrar por tipo (tee.adult, tee.kids, hoodie, etc.) puedes leer req.query.type
  const { type } = req.query;
  const q = type ? { type } : {};
  const guides = await SizeGuide.find(q).lean();
  res.json(guides);
});

// GET /api/size-guides/:id
const getSizeGuideById = asyncHandler(async (req, res) => {
  const doc = await SizeGuide.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: 'SizeGuide no encontrado' });
  res.json(doc);
});

// POST /api/size-guides
const createSizeGuide = asyncHandler(async (req, res) => {
  const created = await SizeGuide.create(req.body);
  res.status(201).json(created);
});

// PUT /api/size-guides/:id
const updateSizeGuide = asyncHandler(async (req, res) => {
  const updated = await SizeGuide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updated) return res.status(404).json({ message: 'SizeGuide no encontrado' });
  res.json(updated);
});

// DELETE /api/size-guides/:id
const deleteSizeGuide = asyncHandler(async (req, res) => {
  const deleted = await SizeGuide.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ message: 'SizeGuide no encontrado' });
  res.status(204).end();
});

module.exports = {
  listSizeGuides,
  getSizeGuideById,
  createSizeGuide,
  updateSizeGuide,
  deleteSizeGuide,
};