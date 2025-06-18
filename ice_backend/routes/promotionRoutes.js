const express = require('express');
const { getPromotions, createPromotion, updatePromotion, deletePromotion } = require('../controllers/promotionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getPromotions);
router.post('/', authMiddleware, createPromotion);
router.put('/:id', authMiddleware, updatePromotion);
router.delete('/:id', authMiddleware, deletePromotion);

module.exports = router;