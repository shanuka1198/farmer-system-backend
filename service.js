const express = require('express');

const db = require('./models/index.js');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
const orderItemRouter = require('./routes/orderItemRoutes.js');
const orderRouter = require('./routes/orderRoutes.js'); 

const app = express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config();
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/order-items', orderItemRouter);
app.use('/api/orders', orderRouter);

(async () => {
  try {
    // Sync the database
    await db.sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});