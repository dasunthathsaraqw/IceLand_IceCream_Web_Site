const express = require('express');
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createInquiry);
router.get('/', authMiddleware, getInquiries);
router.delete('/:id', authMiddleware, deleteInquiry);

module.exports = router;