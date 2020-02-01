const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productImage: { type: String },
    productPublic_id: { type: String},
    productName: { type: String },
    price: { type: Number },
    tag: { type: String }
})

module.exports = mongoose.model('products', productSchema);