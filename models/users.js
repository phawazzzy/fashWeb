const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = ({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String },
    registeredDate: { type: Date, default: Date.now}
});



module.exports = mongoose.model('users', userSchema);