const Product = require('../models/Product');

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { productName, description, category, section, price, discount } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image required' });
    if (!productName || !category || !section || !price)
      return res.status(400).json({ message: 'All required fields must be provided' });

    const sectionsArray = typeof section === 'string' ? JSON.parse(section) : section;

    const product = await Product.create({
      productName,
      description,
      category,
      section: sectionsArray,
      price: Number(price),
      discount: Number(discount) || 0,
      imgUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Delete entire product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Remove section or delete product if last section
exports.removeSection = async (req, res) => {
  try {
    const { sectionToDelete } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (sectionToDelete) {
      product.section = product.section.filter(sec => sec !== sectionToDelete);
    }

    // If no sections remain, delete the product
    if (!sectionToDelete || product.section.length === 0) {
      await Product.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Product deleted as no sections left' });
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting section' });
  }
};
