const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/orderController.js');
const userVerify = require('../middleware/verifyToken.js');
const adminRole = require('../middleware/adminRole.js');

orderRouter.post("/",userVerify,adminRole, orderController.createOrder);
orderRouter.get("/",userVerify, orderController.getAllOrders);
orderRouter.get("/:id",userVerify, orderController.getOrderById);
orderRouter.put("/:id",userVerify,adminRole, orderController.updateOrder);
orderRouter.delete("/:id",userVerify,adminRole, orderController.deleteOrder);

module.exports = orderRouter;