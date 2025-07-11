const mongoose = require('mongoose');
const PromotionSchema = new mongoose.Schema({
  offer: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  minOrder: { type: Number, required: true },
  expires: { type: Date, required: true },
  appliesTo: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  image: { type: String, default: '' } // Added image field for Cloudinary URL
});
module.exports = mongoose.model('Promotion', PromotionSchema);