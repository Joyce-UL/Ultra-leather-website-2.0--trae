const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search by name
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameEn: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sort products
    let sortOption = { createdAt: -1 };
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOption = { price: 1 };
          break;
        case 'price_desc':
          sortOption = { price: -1 };
          break;
        case 'newest':
        default:
          sortOption = { createdAt: -1 };
          break;
      }
    }
    
    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, nameEn, category, description, descriptionEn, price, priceEn, image, isFeatured } = req.body;
    
    const product = new Product({
      name,
      nameEn,
      category,
      description,
      descriptionEn,
      price,
      priceEn,
      image,
      isFeatured
    });
    
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, nameEn, category, description, descriptionEn, price, priceEn, image, isFeatured } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.name = name;
    product.nameEn = nameEn;
    product.category = category;
    product.description = description;
    product.descriptionEn = descriptionEn;
    product.price = price;
    product.priceEn = priceEn;
    product.image = image;
    product.isFeatured = isFeatured;
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};