const express = require('express');
const { createInquiry, getInquiries } = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createInquiry);
router.get('/', authMiddleware, getInquiries);

module.exports = router;