process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Product from "./model/product.js";
import https from "https";
import cors from "cors";

const agent = new https.Agent({
  rejectUnauthorized: false, // <-- disables SSL check
});

dotenv.config();

async function importProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const response = await axios.get('https://dummyjson.com/products', {
      httpsAgent: agent
    });
    const products = response.data.products;

    // Optional: clear existing data before inserting
    // await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(`Inserted ${products.length} products successfully.`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    await mongoose.connection.close();
  }
}

importProducts();
