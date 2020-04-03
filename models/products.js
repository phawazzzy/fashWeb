const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String },
    productImage1: { type: String },
    // price: {type: Number},
    publicid1: { type: String },
    productImage2: { type: String },
    publicid2: { type: String }, 
    productImage3: { type: String },
    publicid3: { type: String },
    productDescription: { type: String },
    productPrice: { type: Number },
    discountedPrice: { type: Number },
    size: { type: String },
    category: { type: String },
    productCollection: { type: String },
    registeredDate: { type: Date, default: Date.now },
    tag: { type: String },
})

module.exports = mongoose.model('products', productSchema);