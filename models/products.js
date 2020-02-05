const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String },
    productImage: {type: String},
    publicid: {type: String},
    productDescription: {type: String},
    productPrice: { type: Number },
    size: {type: String},
    category: {type: String},
    productCollection: {type: String},
    // tag: { type: String },
})

module.exports = mongoose.model('products', productSchema);