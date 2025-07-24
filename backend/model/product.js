// models/Product.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: String,
  date: { type: Date, default: Date.now },
  reviewerName: String,
  reviewerEmail: String
});

const dimensionSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number
});

const metaSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  barcode: String,
  qrCode: String
});

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // optional if using MongoDB's _id
  title: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: dimensionSchema,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: {
  type: String,
  enum: ['In Stock', 'Out of Stock', 'Low Stock'], // ← add 'Low Stock'
  default: 'In Stock'
},
  reviews: [reviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: metaSchema,
  images: [String],
  thumbnail: String
}, { timestamps: true }); // adds createdAt and updatedAt automatically

const Product = mongoose.model('Product', productSchema);

export default Product;
