const db = require("../models/index.js");
const OrderItem = db.orderItems;
const Product = db.products;
const Order = db.order;

exports.createOrderItem = async (req, res) => {
    try {
        const { quantity, orderPrice, product_Id, order_Id } = req.body;
        if (quantity === undefined || orderPrice === undefined || product_Id === undefined || order_Id === undefined) {
            return res.status(400).json({ message: "Quantity, order price, product ID, and order ID are required" });
        }
        const existingProduct = await Product.findByPk(product_Id);
        if (!existingProduct) {
            return res.status(404).json({ message: `Product with ID ${product_Id} not found` });
        }
        const existingOrder = await Order.findByPk(order_Id);
        if (!existingOrder) {
            return res.status(404).json({ message: `Order with ID ${order_Id} not found` });
        }

        const totalPrice=existingProduct.price*quantity
        console.log(totalPrice)
        const newOrderItem = await OrderItem.create({ quantity, orderPrice:totalPrice, product_Id, order_Id });
        res.status(201).json(newOrderItem);
    } catch (error) {
        console.error("Error creating order item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.status(200).json(orderItems);
    } catch (error) {
        console.error("Error fetching order items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundOrderItem = await OrderItem.findByPk(id);
        if (!foundOrderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        res.status(200).json(foundOrderItem);
    } catch (error) {
        console.error("Error fetching order item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, product_Id, order_Id } = req.body;

        const foundOrderItem = await OrderItem.findByPk(id);
        if (!foundOrderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        // If product_Id is being updated, validate it and update orderPrice accordingly
        if (product_Id !== undefined) {
            const existingProduct = await Product.findByPk(product_Id);
            if (!existingProduct) {
                return res.status(404).json({ message: `Product with ID ${product_Id} not found` });
            }
            foundOrderItem.product_Id = product_Id;
            // If quantity is also being updated, use new quantity, else use existing
            const qty = quantity !== undefined ? quantity : foundOrderItem.quantity;
            foundOrderItem.orderPrice = existingProduct.price * qty;
        }

        // If order_Id is being updated, validate it
        if (order_Id !== undefined) {
            const existingOrder = await Order.findByPk(order_Id);
            if (!existingOrder) {
                return res.status(404).json({ message: `Order with ID ${order_Id} not found` });
            }
            foundOrderItem.order_Id = order_Id;
        }

        // If quantity is being updated, update it and recalculate orderPrice if product is not being changed
        if (quantity !== undefined) {
            foundOrderItem.quantity = quantity;
            if (product_Id === undefined) {
                // Use current product price
                const existingProduct = await Product.findByPk(foundOrderItem.product_Id);
                foundOrderItem.orderPrice = existingProduct.price * quantity;
            }
        }

        await foundOrderItem.save();
        res.status(200).json(foundOrderItem);
    } catch (error) {
        console.error("Error updating order item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OrderItem.destroy({ where: { orderItemId: id } });
        if (result === 0) {
            return res.status(404).json({ message: "Order item not found" });
        }
        res.status(200).json({ message: "Order item deleted successfully" });
    } catch (error) {
        console.error("Error deleting order item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getOrderItemsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderItems = await OrderItem.findAll({ where: { order_Id: orderId } });
        if (orderItems.length === 0) {
            return res.status(404).json({ message: `No order items found for order ID ${orderId}` });
        }
        res.status(200).json(orderItems);
    } catch (error) {
        console.error("Error fetching order items by order ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}