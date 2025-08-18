const db = require("../models/index.js");
const Product = db.products;
const Category = db.categories;
const Users = db.users;

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      stockQuantity,
      available,
      user_Id,
      category_Id,
    } = req.body;
    if (
      !productName ||
      !description ||
      price === undefined ||
      stockQuantity === undefined ||
      available === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await Users.findByPk(user_Id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with ID ${user_Id} not found` });
    }
    const existingCategory = await Category.findByPk(category_Id);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ message: `Category with ID ${category_Id} not found` });
    }
    const product = await Product.create({
      productName,
      description,
      price,
      stockQuantity,
      available,
      user_Id,
      category_Id,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Users,
          as: "user", 
          attributes: ["name"], 
        },
        {
          model: Category,
          as: "category", 
          attributes: ["categoryName"],
        },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      productName,
      description,
      price,
      stockQuantity,
      available,
      user_Id,
      category_Id,
    } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (user_Id) {
      const existingUser = await Users.findByPk(user_Id);
      if (!existingUser) {
        return res
          .status(404)
          .json({ message: `User with ID ${user_Id} not found` });
      }
      product.user_Id = user_Id;
    }
    if (category_Id) {
      const existingCategory = await Category.findByPk(category_Id);
      if (!existingCategory) {
        return res
          .status(404)
          .json({ message: `Category with ID ${category_Id} not found` });
      }
      product.category_Id = category_Id;
    }
    product.productName = productName || product.productName;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.stockQuantity =
      stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
    product.available = available !== undefined ? available : product.available;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.findAll({
      where: { category_Id: categoryId },
      include: [{ model: Category, as: "category" }],
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const products = await Product.findAll({
      where: { user_Id: userId },
      include: [{ model: Users, as: "user" }],
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this user" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
