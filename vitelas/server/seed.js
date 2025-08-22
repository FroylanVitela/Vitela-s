const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Product = require('./models/Product');
const OptionSet = require('./models/OptionSet');
const SizeGuide = require('./models/SizeGuide');
const GarmentPackage = require('./models/GarmentPackage');
const Policy = require('./models/Policy');

async function seed() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mitienda';
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  await Promise.all([
    Product.deleteMany({}),
    OptionSet.deleteMany({}),
    SizeGuide.deleteMany({}),
    GarmentPackage.deleteMany({}),
    Policy.deleteMany({})
  ]);

  const load = file => JSON.parse(fs.readFileSync(path.join(__dirname, 'seeds', file), 'utf8'));

  await Product.insertMany(load('products.json'));
  await OptionSet.insertMany(load('optionSets.json'));
  await SizeGuide.insertMany(load('sizeGuides.json'));
  await GarmentPackage.insertMany(load('garmentPackages.json'));
  await Policy.insertMany(load('policies.json'));

  console.log('Database seeded');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});