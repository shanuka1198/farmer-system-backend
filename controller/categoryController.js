const db=require('../models/index.js');
const Category = db.categories;


exports.createCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;

        if (!categoryName || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new category
        const category = await Category.create({ categoryName, description });
        res.status(201).json(category);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { categoryName, description } = req.body;

        const category = await Category.findByPk(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Update category details
        category.categoryName = categoryName || category.categoryName;
        category.description = description || category.description;

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}