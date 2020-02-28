const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    paymentRef: {type: String},
    orderDetails: {type: Object},
    status: {type: String, default: 'pending'},
    createdDate : {type: String},
    paidDate: {type: String}
})

module.exports = mongoose.model('order', orderSchema)