const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', default: null }
});
module.exports = mongoose.model('Product', ProductSchema);