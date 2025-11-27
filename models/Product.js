const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    section: { type: [String], default: [] }, // array of sections
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    imgUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
