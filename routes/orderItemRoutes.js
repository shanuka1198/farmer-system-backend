const express = require('express');
const orderItemRouter = express.Router();
const orderItemController = require('../controller/orderItemController.js');
const userVerify = require('../middleware/verifyToken.js');
const adminRole = require('../middleware/adminRole.js');

orderItemRouter.post("/",userVerify,adminRole, orderItemController.createOrderItem);
orderItemRouter.get("/",userVerify, orderItemController.getAllOrderItems);
orderItemRouter.get("/:id",userVerify, orderItemController.getOrderItemById);
orderItemRouter.put("/:id",userVerify,adminRole, orderItemController.updateOrderItem);
orderItemRouter.delete("/:id",userVerify,adminRole, orderItemController.deleteOrderItem);
orderItemRouter.get("/order/:orderId", userVerify, orderItemController.getOrderItemsByOrderId);

module.exports = orderItemRouter;