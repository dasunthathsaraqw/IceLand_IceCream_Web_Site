const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], 
  category: { type: String, required: true },
  promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', default: null },
});
module.exports = mongoose.model('Product', ProductSchema);