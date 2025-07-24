import React from 'react';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.thumbnail} alt={product.title} width={150} />
    <h3>{product.title}</h3>
    <p>${product.price}</p>
    <p>Rating: {product.rating}</p>
    <p>{product.availabilityStatus}</p>
  </div>
);

export default ProductCard;
