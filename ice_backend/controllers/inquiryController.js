const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res) => {
  const { name, email, message, cartItems, totalAmount } = req.body;
  try {
    const inquiry = new Inquiry({ name, email, message, cartItems, totalAmount });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
