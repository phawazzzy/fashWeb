const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productImage: { type: String},
    productName: {type: String},
    price: {type: Number},
    tag: {type: String}
})

mongoose.model('product', productSchema);