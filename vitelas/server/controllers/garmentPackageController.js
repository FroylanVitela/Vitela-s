// controllers/garmentPackageController.js
const GarmentPackage = require('../models/GarmentPackage');

// Helper para manejar errores async sin repetir try/catch
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/garment-packages
const listGarmentPackages = asyncHandler(async (req, res) => {
  // Puedes filtrar por type o category si lo necesitas: ?type=tee | hoodie etc.
  const { type } = req.query;
  const q = type ? { type } : {};
  const items = await GarmentPackage.find(q).lean();
  res.json(items);
});

// GET /api/garment-packages/:id
const getGarmentPackageById = asyncHandler(async (req, res) => {
  const doc = await GarmentPackage.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: 'GarmentPackage no encontrado' });
  res.json(doc);
});

// POST /api/garment-packages
const createGarmentPackage = asyncHandler(async (req, res) => {
  const created = await GarmentPackage.create(req.body);
  res.status(201).json(created);
});

// PUT /api/garment-packages/:id
const updateGarmentPackage = asyncHandler(async (req, res) => {
  const updated = await GarmentPackage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updated) return res.status(404).json({ message: 'GarmentPackage no encontrado' });
  res.json(updated);
});

// DELETE /api/garment-packages/:id
const deleteGarmentPackage = asyncHandler(async (req, res) => {
  const deleted = await GarmentPackage.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ message: 'GarmentPackage no encontrado' });
  res.status(204).end();
});

module.exports = {
  listGarmentPackages,
  getGarmentPackageById,
  createGarmentPackage,
  updateGarmentPackage,
  deleteGarmentPackage,
};
