// node server/scripts/normalize-finishes.js
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'seeds', 'products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let touched = 0;
for (const p of data) {
  if (p.slug === 'botellas-aluminio') {
    for (const v of (p.variants || [])) {
      v.attributes ||= {};
      const a = v.attributes;
      if (!('finish' in a) && !('finishOptions' in a)) {
        a.finishOptions = ['blanco', 'plateado'];
        touched++;
      }
      // Corrige cadenas como "blanco/plateado"
      if (a.finish && typeof a.finish === 'string' && a.finish.includes('/')) {
        delete a.finish;
        a.finishOptions = ['blanco', 'plateado'];
        touched++;
      }
    }
  }
}

fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
console.log(`normalize-finishes: actualizadas ${touched} variantes`);
