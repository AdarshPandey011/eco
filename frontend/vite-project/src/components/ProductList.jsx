import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import FilterSortControls from "./FilterSortControls";
import axios from "axios";

const ProductList = () => {
  const [filters, setFilters] = useState({ category: "", availability: "" });
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from backend when category changes
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products?category=${filters.category}`)
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch((error) => {
        console.error("Something went wrong fetching products", error);
      });
  }, [filters.category]);

  // Filter availability & apply sorting
  useEffect(() => {
    let result = [...products];

    // Filter by availability
    if (filters.availability) {
      result = result.filter(
        (p) => p.availabilityStatus === filters.availability
      );
    }

    // Apply sorting
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
  }, [products, filters.availability, sort]);

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
