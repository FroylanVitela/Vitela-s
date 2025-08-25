const SizeGuide = require('../models/SizeGuide');
const { makeCrudController } = require('./factory');

module.exports = makeCrudController(SizeGuide, {
  text: ['key', 'title', 'rows.size'],
  filterable: ['key', 'unit']
});
