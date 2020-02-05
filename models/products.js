const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String },
    productImage1: {
        image1Public_id : {type: String},
        image1_url: {type: String}
    },
    productImage2: {
        image2Public_id : {type: String},
        image2_url: {type: String}
    },
    productImage3: {
        image3Public_id : {type: String},
        image3_url: {type: String}
    },
    productDescription: {type: String},
    productPrice: { type: Number },
    size: {type: String},
    category: {type: String},
    collection: {type: String},
    // tag: { type: String },
})

module.exports = mongoose.model('products', productSchema);