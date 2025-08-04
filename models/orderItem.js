module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("OrderItem", {
    orderItemId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    orderPrice: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    product_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'productId'
      }
    },
    order_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'orderId'
      }
    }
  }, {
    timestamps: true,
    tableName: 'OrderItems'
  });

  return OrderItem;
};
