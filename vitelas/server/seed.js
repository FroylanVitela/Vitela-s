// seed.js
'use strict';
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

// Modelos
const Product = require('./models/Product');
const OptionSet = require('./models/OptionSet');
const SizeGuide = require('./models/SizeGuide');
const GarmentPackage = require('./models/GarmentPackage');
const Policy = require('./models/Policy');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vitelas';
const SEEDS_DIR = path.join(__dirname, 'seeds');

/* ========================= Helpers ========================= */

function readJSONSafe(filename, fallback = []) {
  const full = path.join(SEEDS_DIR, filename);
  if (!fs.existsSync(full)) {
    console.warn(`[Seed] Archivo no encontrado: seeds/${filename} — se omite.`);
    return fallback;
    }
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (err) {
    console.error(`[Seed] Error leyendo seeds/${filename}: ${err.message}`);
    return fallback;
  }
}

// upsert por campos clave. Devuelve conteos.
async function upsertMany(Model, docs, keyFields = ['_id']) {
  if (!Array.isArray(docs) || docs.length === 0) {
    return { matched: 0, modified: 0, upserted: 0 };
  }

  const ops = docs.map((doc) => {
    // Construir filtro por la primera keyField disponible en el documento
    const filter = {};
    const foundKey = keyFields.find((k) => doc[k] != null && doc[k] !== '');
    if (foundKey) {
      filter[foundKey] = doc[foundKey];
    } else if (doc.name) {
      // fallback razonable si no hubo clave
      filter.name = doc.name;
    } else {
      // último recurso: upsert por _id nuevo
      filter._id = doc._id || new mongoose.Types.ObjectId();
    }

    return {
      updateOne: {
        filter,
        update: { $set: doc },
        upsert: true,
      },
    };
  });

  const res = await Model.bulkWrite(ops, { ordered: false });
  const matched = res.matchedCount ?? res.nMatched ?? 0;
  const modified = res.modifiedCount ?? res.nModified ?? 0;
  const upserted =
    res.upsertedCount ??
    (Array.isArray(res.upserted) ? res.upserted.length : 0) ??
    0;

  return { matched, modified, upserted };
}

function logResult(label, r) {
  console.log(
    `[Seed] ${label}: matched=${r.matched} modified=${r.modified} upserted=${r.upserted}`
  );
}

/* ========================= Ejecución ========================= */

async function run({ drop = false, only = null } = {}) {
  await mongoose.connect(MONGO_URI);
  console.log('[Mongo] Conectado a', MONGO_URI);

  if (drop) {
    console.log('[Seed] Limpiando colecciones…');
    await Promise.all([
      Product.deleteMany({}),
      OptionSet.deleteMany({}),
      SizeGuide.deleteMany({}),
      GarmentPackage.deleteMany({}),
      Policy.deleteMany({}),
    ]);
  }

  // Cargar datasets (si no existe el archivo, se omite sin romper)
  const products = readJSONSafe('products.json');               // array
  const optionSets = readJSONSafe('optionSets.json');           // array
  const sizeGuides = readJSONSafe('sizeGuides.json');           // array
  const garmentPackages = readJSONSafe('garmentPackages.json'); // array
  const policies = readJSONSafe('policies.json');               // array

  // Sembrar según filtro --only=
  const should = (name) => !only || only.has(name);

  if (should('optionSets')) {
    const r = await upsertMany(OptionSet, optionSets, ['key']);
    logResult('OptionSets', r);
  }

  if (should('sizeGuides')) {
    const r = await upsertMany(SizeGuide, sizeGuides, ['slug']);
    logResult('SizeGuides', r);
  }

  if (should('garmentPackages')) {
    const r = await upsertMany(GarmentPackage, garmentPackages, ['slug', 'name']);
    logResult('GarmentPackages', r);
  }

  if (should('policies')) {
    const r = await upsertMany(Policy, policies, ['slug', 'title']);
    logResult('Policies', r);
  }

  if (should('products')) {
    const r = await upsertMany(Product, products, ['slug', 'sku']);
    logResult('Products', r);
  }

  console.log('[Seed] ¡Listo!');
  await mongoose.disconnect();
}

/* ========================= CLI =========================
   Flags disponibles:
   --drop            Limpia colecciones antes de sembrar.
   --only=a,b,c      Si se pasa, solo siembra esos conjuntos. Opciones:
                     products, optionSets, sizeGuides, garmentPackages, policies
   ====================================================== */

(async () => {
  try {
    const args = process.argv.slice(2);
    const drop = args.includes('--drop');

    const onlyArg = args.find((a) => a.startsWith('--only='));
    const only = onlyArg
      ? new Set(
          onlyArg
            .replace('--only=', '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        )
      : null;

    await run({ drop, only });
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();