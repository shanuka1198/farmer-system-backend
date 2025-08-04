const db = require("../models/index.js");
const Order = db.order;
const Users = db.users;
const OrderItems = db.orderItems;

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { orderDate, totalPrice, status, farmer_id, admin_id } = req.body;
    if (
      orderDate === undefined ||
      totalPrice === undefined ||
      status === undefined ||
      farmer_id === undefined
    ) {
      return res.status(400).json({
        message:
          "Order date, total price, status, and farmer_id are required",
      });
    }
    const farmer = await Users.findByPk(farmer_id);
    if (!farmer) {
      return res
        .status(404)
        .json({ message: `User (farmer) with ID ${farmer_id} not found` });
    }
    let admin = null;
    if (admin_id) {
      admin = await Users.findByPk(admin_id);
      if (!admin) {
        return res
          .status(404)
          .json({ message: `User (admin) with ID ${admin_id} not found` });
      }
    }
    const newOrder = await Order.create({
      orderDate,
      totalPrice,
      status,
      farmer_id,
      admin_id,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundOrder = await Order.findByPk(id);
    if (!foundOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(foundOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderDate, totalPrice, status, farmer_id, admin_id } = req.body;
    const foundOrder = await Order.findByPk(id);
    if (!foundOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (farmer_id) {
      const farmer = await Users.findByPk(farmer_id);
      if (!farmer) {
        return res
          .status(404)
          .json({ message: `User (farmer) with ID ${farmer_id} not found` });
      }
      foundOrder.farmer_id = farmer_id;
    }
    if (admin_id) {
      const admin = await Users.findByPk(admin_id);
      if (!admin) {
        return res
          .status(404)
          .json({ message: `User (admin) with ID ${admin_id} not found` });
      }
      foundOrder.admin_id = admin_id;
    }
    foundOrder.orderDate = orderDate ?? foundOrder.orderDate;
    foundOrder.totalPrice = totalPrice ?? foundOrder.totalPrice;
    foundOrder.status = status ?? foundOrder.status;
    await foundOrder.save();
    res.status(200).json(foundOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const foundOrder = await Order.findByPk(id);
    if (!foundOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    await foundOrder.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
