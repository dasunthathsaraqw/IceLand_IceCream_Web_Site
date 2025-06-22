const Product = require('../models/Product');
const Promotion = require('../models/Promotion');
const Inquiry = require('../models/Inquiry');

exports.getProductReport = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('promotionId', 'offer discount')
      .lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPromotionReport = async (req, res) => {
  try {
    const promotions = await Promotion.find().lean();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getInquiryReport = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};