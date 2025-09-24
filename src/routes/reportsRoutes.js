const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reportsController');

router.get('/monthly_indicators', ctrl.getMonthlyIndicators);
router.get('/payment_summary', ctrl.getPaymentSummary);

module.exports = router;
