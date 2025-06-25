const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getProducts);
router.post('/', authMiddleware, upload.array('images', 5), createProduct);
router.put('/:id', authMiddleware, upload.array('images', 5), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;