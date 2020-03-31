const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
    sliderName: { type: String },
    sliderImage: { type: String },
    publicid: { type: String },
    text_on_slider: { type: String },
    craetedDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('slider', sliderSchema)