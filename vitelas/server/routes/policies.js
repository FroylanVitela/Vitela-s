// routes/policies.js
const express = require('express');
const router = express.Router();

const {
  listPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
} = require('../controllers/policyController');

// Diagnóstico (puedes dejarlo un rato y luego borrarlo):
// console.log('policyController types:', {
//   listPolicies: typeof listPolicies,
//   getPolicyById: typeof getPolicyById,
//   createPolicy: typeof createPolicy,
//   updatePolicy: typeof updatePolicy,
//   deletePolicy: typeof deletePolicy,
// });

router.get('/', listPolicies);
router.get('/:id', getPolicyById);
router.post('/', createPolicy);
router.put('/:id', updatePolicy);
router.delete('/:id', deletePolicy);

module.exports = router;
