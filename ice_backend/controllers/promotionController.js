 const Promotion = require('../models/Promotion');
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPromotion = async (req, res) => {
  try {
    // Extract form fields from req.body (parsed by multer)
    const { offer, description, discount, minOrder, expires, appliesTo, isActive, existingImage } = req.body;

    // Validate required fields
    if (!offer || !description || !discount || !minOrder || !expires || !appliesTo) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    let imageUrl = existingImage || '';

    // Handle image upload to Cloudinary if a new image is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'promotions',
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
    }

    // Create new promotion
    const promotion = new Promotion({
      offer,
      description,
      discount: Number(discount),
      minOrder: Number(minOrder),
      expires: new Date(expires),
      appliesTo,
      isActive: isActive === 'true', // Convert string to boolean
      image: imageUrl,
    });

    const savedPromotion = await promotion.save();
    res.status(201).json(savedPromotion);
  } catch (err) {
    console.error('Error creating promotion:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const { offer, description, discount, minOrder, expires, appliesTo, isActive, existingImage } = req.body;
    const promotionId = req.params.id;

    // Find existing promotion
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    let imageUrl = existingImage || promotion.image;

    // Handle image upload to Cloudinary if a new image is provided
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (promotion.image) {
        const publicId = promotion.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`promotions/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'promotions',
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
    }

    // Update promotion
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      promotionId,
      {
        offer: offer || promotion.offer,
        description: description || promotion.description,
        discount: discount ? Number(discount) : promotion.discount,
        minOrder: minOrder ? Number(minOrder) : promotion.minOrder,
        expires: expires ? new Date(expires) : promotion.expires,
        appliesTo: appliesTo || promotion.appliesTo,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : promotion.isActive,
        image: imageUrl,
      },
      { new: true }
    );

    res.json(updatedPromotion);
  } catch (err) {
    console.error('Error updating promotion:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    // Delete image from Cloudinary if it exists
    if (promotion.image) {
      const publicId = promotion.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`promotions/${publicId}`);
    }

    // Delete promotion and update related products
    await promotion.remove();
    await Product.updateMany({ promotionId: req.params.id }, { promotionId: null });

    res.json({ message: 'Promotion deleted' });
  } catch (err) {
    console.error('Error deleting promotion:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
