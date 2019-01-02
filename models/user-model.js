
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema =  new Schema({
    firstName: String,
    email: String,
    lastName: String,
    phoneNumber: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
