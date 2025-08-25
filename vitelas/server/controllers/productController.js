const Product = require('../models/Product');
const { makeCrudController } = require('./factory');

module.exports = makeCrudController(Product, {
  text: ['name', 'description', 'variants.name'],
  filterable: ['category', 'subcategory', 'materials', 'tags', 'active']
});