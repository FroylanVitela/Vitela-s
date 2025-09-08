const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    category: [
      { value: 'garments', label: 'Ropa' },
      { value: 'drinkware', label: 'Tazas & Drinkware' },
      { value: 'accessories', label: 'Accesorios' }
    ],
    subCategory: [
      { value: 'playeras', label: 'Playeras' },
      { value: 'sudaderas', label: 'Sudaderas' },
      { value: 'tazas', label: 'Tazas' },
      { value: 'llaveros', label: 'Llaveros' }
    ],
    material: [
      { value: 'Algodón', label: 'Algodón' },
      { value: 'Algodón/Poliéster', label: 'Algodón/Poliéster' },
      { value: 'Cerámica', label: 'Cerámica' },
      { value: 'Acero', label: 'Acero' }
    ],
    finish: [
      { value: 'DTF', label: 'DTF' },
      { value: 'Sublimación', label: 'Sublimación' }
    ]
  });
});

module.exports = router;
