const express = require('express');
const { getProductReport, getPromotionReport, getInquiryReport } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/products', authMiddleware, getProductReport);
router.get('/promotions', authMiddleware, getPromotionReport);
router.get('/inquiries', authMiddleware, getInquiryReport);

module.exports = router;