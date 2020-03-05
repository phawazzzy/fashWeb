const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String },
    phoneNum: { type: String },
    registeredDate: { type: Date, default: Date.now }
});


userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validatePassword = (password, userPassword) => {
    // console.log(userPassword, password)
    return bcrypt.compareSync(password, userPassword);
};


module.exports = mongoose.model('users', userSchema);