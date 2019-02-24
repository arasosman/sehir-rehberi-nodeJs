const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    }
});

module.exports = mongoose.model('user', UserSchema);