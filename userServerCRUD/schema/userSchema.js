const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true,
    }
})

module.exports = userSchema;