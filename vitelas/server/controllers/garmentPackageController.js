const GarmentPackage = require('../models/GarmentPackage');
const { makeCrudController } = require('./factory');

module.exports = makeCrudController(GarmentPackage, {
  text: ['title', 'garmentType', 'audience'],
  filterable: ['garmentType', 'audience', 'active']
});