// Frontend
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import FilterSortControls from "./FilterSortControls";
import axios from "axios";

const ProductList = () => {
  const [filters, setFilters] = useState({ category: "", availability: "" });
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]); // All products from backend
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products once on mount
  useEffect(() => {
    axios
      .get(http://localhost:3000/?category=${filters.category}) // Assuming your backend route is /products
      .then((res) => {
        setProducts(res.data.products || []); // set products from backend response
      })
      .catch((error) => {
        console.error("Something went wrong fetching products", error);
      });
  }, []);

  // Apply filtering and sorting whenever products, filters or sort change
  useEffect(() => {
    let result = [...products];

    // Filtering
    if (filters.category) {
      // result = result.filter(p => p.category === filters.category);
      
      axios
        .get(http://localhost:3000/?category=${filters.category})
        .then((res) => {
          setProducts(res.data.products || []); // set products from backend response
        })
        .catch((error) => {
          console.error("Something went wrong fetching products", error);
        });
      console.log(filters.category);
    }
    if (filters.availability) {
      result = result.filter(
        (p) => p.availabilityStatus === filters.availability
      );
    }

    // Sorting
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, filters, sort]);

  return (
    <div>
      <FilterSortControls
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;


//Backend



import express, { response } from 'express'
import axios from 'axios'
import https from 'https'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Product from './model/product.js';
dotenv.config()
const app = express()

app.use(cors())
const agent = new https.Agent({
  rejectUnauthorized: false // <-- disables SSL check
});


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongo is connected")
})
.catch(()=>{
    console.log("something went wrong")
})

app.get('/',async (req,res)=>{
//   const response = await axios.get('https://dummyjson.com/products', {
//       httpsAgent: agent
//     });
    // const response = await Product.find()
    console.log("hello this is server")
    const category = req.query.category
    res.send({})
    console.log('category',category)
    return

    
    if(category.toLowerCase() === ''){
        const response = await Product.find()
        console.log(response)
        res.send(response)
    }

    try{

        const response = Product.find({category})
        res.send(response)
    }
    catch{
        console.log('something went wrong')
    }
    

   
//    res.send(response)
})


app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})

