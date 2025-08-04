const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController.js');
const userVerify = require('../middleware/verifyToken.js');
const userRole = require('../middleware/userRole.js');

productRouter.post("/",userVerify,userRole, productController.createProduct);
productRouter.get("/",userVerify, productController.getAllProducts);
productRouter.get("/:id",userVerify, productController.getProductById);
productRouter.put("/:id",userVerify,userRole, productController.updateProduct);
productRouter.delete("/:id",userVerify, productController.deleteProduct);
productRouter.get("/category/:categoryId", userVerify, productController.getProductsByCategory);
productRouter.get("/user/:userId", userVerify, productController.getProductsByUser);

module.exports = productRouter;