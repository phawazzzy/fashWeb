const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    paymentRef: {type: String},
    orderDetails: {type: Object}
    
})

module.exports = mongoose.model('order', orderSchema)