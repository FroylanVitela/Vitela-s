const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../models/Product');
const SizeGuide = require('../models/SizeGuide');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const drop = process.argv.includes('--drop');

  if (drop) {
    await Promise.all([
      Product.deleteMany({}),
      SizeGuide.deleteMany({})
    ]);
  }

  // Products
  const productsPath = path.join(__dirname, '../seeds/products.json');
  if (fs.existsSync(productsPath)) {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    if (products.length) await Product.insertMany(products);
  }

  // Size Guides
  const guidesPath = path.join(__dirname, '../seeds/sizeGuides.json');
  if (fs.existsSync(guidesPath)) {
    const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
    if (guides.length) await SizeGuide.insertMany(guides);
  }

  console.log('Seed ok');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
