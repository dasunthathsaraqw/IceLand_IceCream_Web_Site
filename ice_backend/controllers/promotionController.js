const Promotion = require('../models/Promotion');
const Product = require('../models/Product');

exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPromotion = async (req, res) => {
  const { offer, description, discount, minOrder, expires, appliesTo, isActive } = req.body;
  try {
    const promotion = new Promotion({ offer, description, discount, minOrder, expires, appliesTo, isActive });
    await promotion.save();
    res.status(201).json(promotion);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePromotion = async (req, res) => {
  const { offer, description, discount, minOrder, expires, appliesTo, isActive } = req.body;
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      { offer, description, discount, minOrder, expires, appliesTo, isActive },
      { new: true }
    );
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    await Product.updateMany({ promotionId: req.params.id }, { promotionId: null });
    res.json({ message: 'Promotion deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
