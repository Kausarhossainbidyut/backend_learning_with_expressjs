const { name } = require('ejs');
const e = require('express');
const mongoose = require('mongoose');
const { use } = require('react');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date : { type: Date, default: Date.now }
})


module.exports = userSchema;