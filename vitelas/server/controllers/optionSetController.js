const OptionSet = require('../models/OptionSet');
const { makeCrudController } = require('./factory');

module.exports = makeCrudController(OptionSet, {
  text: ['key', 'name', 'options.value'],
  filterable: ['key']
});