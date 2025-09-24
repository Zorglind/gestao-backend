const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reportsController');

// === Relatórios (como frontend espera) ===
router.get('/monthly_indicators', ctrl.getMonthlyIndicators);
router.get('/payment_methods_summary', ctrl.getPaymentSummary);

module.exports = router;
