import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './model/product.js';

dotenv.config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Mongo is connected');
  })
  .catch((err) => {
    console.log('Mongo connection failed:', err);
  });

// Route to get products with optional category filter
app.get('/products', async (req, res) => {
  const {category} = req.query;
  console.log("Request received. Category:", category);

  try {
    let products;

    if (!category || category.trim() === '') {
      // No category filter, return all products
      products = await Product.find();
    } else {
      // Filter by category
      products = await Product.find({ category });
    }

    res.send({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
