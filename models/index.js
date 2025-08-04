// models/index.js
const dbConfig = require("../config/dbConfig.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.users = require("./user.js")(sequelize, Sequelize);
db.products = require("./product.js")(sequelize, Sequelize);
db.categories = require("./category.js")(sequelize, Sequelize);
db.orderItems = require("./OrderItem.js")(sequelize, Sequelize);
db.order = require("./order.js")(sequelize, Sequelize);

db.users.hasMany(db.products, { foreignKey: 'user_Id', as: 'products' });
db.products.belongsTo(db.users, { foreignKey: 'user_Id', as: 'user' });

db.categories.hasMany(db.products, { foreignKey: 'category_Id', as: 'products' });
db.products.belongsTo(db.categories, { foreignKey: 'category_Id', as: 'category' });

db.products.hasMany(db.orderItems, { foreignKey: 'product_Id', as: 'orderItems' });
db.orderItems.belongsTo(db.products, { foreignKey: 'product_Id', as: 'product' });

db.order.hasMany(db.orderItems, { foreignKey: 'order_Id', as: 'orderItems' });
db.orderItems.belongsTo(db.order, { foreignKey: 'order_Id', as: 'order' });

db.users.hasMany(db.order, { foreignKey: 'farmer_id', as: 'farmerOrders' });
db.order.belongsTo(db.users, { foreignKey: 'farmer_id', as: 'farmer' });

db.users.hasMany(db.order, { foreignKey: 'admin_id', as: 'adminOrders' });
db.order.belongsTo(db.users, { foreignKey: 'admin_id', as: 'admin' });

module.exports = db;
