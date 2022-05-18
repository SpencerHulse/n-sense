const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  stock: {
    type: Number,
    min: 0,
    default: 0,
  },
  images: [
    {
      type: String,
    },
  ],
  primaryImage: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
// reviews: [Review.schema]

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
