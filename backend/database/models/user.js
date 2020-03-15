const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        trim: true,
        minlength: 1
    }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;