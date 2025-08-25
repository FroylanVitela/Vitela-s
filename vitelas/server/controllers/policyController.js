const Policy = require('../models/Policy');
const { makeCrudController } = require('./factory');

module.exports = makeCrudController(Policy, {
  text: ['key', 'title', 'content'],
  filterable: ['key']
});
