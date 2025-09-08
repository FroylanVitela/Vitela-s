// routes/garmentPackages.js
const express = require('express');
const router = express.Router();

const {
  listGarmentPackages,
  getGarmentPackageById,
  createGarmentPackage,
  updateGarmentPackage,
  deleteGarmentPackage,
} = require('../controllers/garmentPackageController');

// Descomenta si quieres verificar que no vengan undefined
// console.log('garment ctrl loaded:', {
//   listGarmentPackages: typeof listGarmentPackages,
//   getGarmentPackageById: typeof getGarmentPackageById,
//   createGarmentPackage: typeof createGarmentPackage,
//   updateGarmentPackage: typeof updateGarmentPackage,
//   deleteGarmentPackage: typeof deleteGarmentPackage,
// });

router.get('/', listGarmentPackages);
router.get('/:id', getGarmentPackageById);
router.post('/', createGarmentPackage);
router.put('/:id', updateGarmentPackage);
router.delete('/:id', deleteGarmentPackage);

module.exports = router;
