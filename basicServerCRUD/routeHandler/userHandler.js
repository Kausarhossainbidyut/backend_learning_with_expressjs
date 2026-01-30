const exports = require('express')
const mongoose = require('mongoose')
const router = exports.Router()
const userSchema = require('../schema/userSchema')

const User = new mongoose.model('User', userSchema)

// signup user
router.post('/signup', async (req, res, next) => {
    try{

    }catch(err){
        
    }
})