const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dataController');

router.post('/paid_traffic', ctrl.addPaidTraffic);
router.post('/operational_data', ctrl.addOperationalData);
router.post('/financial_data', ctrl.addFinancialData);

module.exports = router;
