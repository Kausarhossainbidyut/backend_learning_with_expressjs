const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schema/userSchema');

const User = mongoose.model('User', userSchema);

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/users')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Example route to get user information
router.get('/', async (req, res) => {
    res.send('User Information');
})


// post a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saveUser = await newUser.save()
        res.status(200).json({
            message: "User created successfully",
            data: saveUser
        })
    }catch (err) {
        res.status(500).json({ 
            error: 'User created failed',
            message: err.message 
        });
    }
})


module.exports = router;
