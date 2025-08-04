const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controller/categoryController.js');
const userVerify = require('../middleware/verifyToken.js');
const adminRole = require('../middleware/adminRole.js');

categoryRouter.post("/",userVerify,adminRole, categoryController.createCategory);
categoryRouter.get("/",userVerify,adminRole, categoryController.getAllCategories);
categoryRouter.get("/:id",userVerify,adminRole,categoryController.getCategoryById);
categoryRouter.put("/:id",userVerify,adminRole, categoryController.updateCategory);
categoryRouter.delete("/:id",userVerify,adminRole, categoryController.deleteCategory);

module.exports = categoryRouter;