const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('promotionId');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, category, promotionId } = req.body;

  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        })
      );
      imageUrls = await Promise.all(uploadPromises);
    } else {
      return res.status(400).json({ message: 'At least one image is required for new products' });
    }

    const product = new Product({
      name,
      price,
      description,
      images: imageUrls,
      category,
      promotionId: promotionId || null,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    if (err.message === 'Only images are allowed') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, price, description, category, promotionId, existingImages } = req.body;

  try {
    let updateData = {
      name,
      price,
      description,
      category,
      promotionId: promotionId || null,
      images: existingImages ? (Array.isArray(existingImages) ? existingImages : [existingImages]) : [],
    };

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        })
      );
      const newImageUrls = await Promise.all(uploadPromises);
      updateData.images = [...updateData.images, ...newImageUrls].slice(0, 5);

      // Delete old images from Cloudinary if replaced
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct.images && oldProduct.images.length > 0) {
        const deletePromises = oldProduct.images
          .filter((img) => !updateData.images.includes(img))
          .map((img) => {
            const publicId = img.split('/').pop().split('.')[0];
            return cloudinary.uploader.destroy(`products/${publicId}`);
          });
        await Promise.all(deletePromises);
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    if (err.message === 'Only images are allowed') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete all images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((img) => {
        const publicId = img.split('/').pop().split('.')[0];
        return cloudinary.uploader.destroy(`products/${publicId}`);
      });
      await Promise.all(deletePromises);
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};