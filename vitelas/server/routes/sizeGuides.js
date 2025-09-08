const express = require('express');
const router = express.Router();
const SizeGuide = require('../models/SizeGuide');

// GET /api/size-guides  (filtros opcionales ?garment=playera&audience=caballero)
router.get('/', async (req, res, next) => {
  try {
    const { garment, audience } = req.query;
    const q = {};
    if (garment) q.garment = garment;
    if (audience) q.audience = audience;
    const items = await SizeGuide.find(q).sort({ garment: 1, audience: 1, title: 1 });
    res.json(items);
  } catch (err) { next(err); }
});

// GET /api/size-guides/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const item = await SizeGuide.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ message: 'Guía no encontrada' });
    res.json(item);
  } catch (err) { next(err); }
});

module.exports = router;