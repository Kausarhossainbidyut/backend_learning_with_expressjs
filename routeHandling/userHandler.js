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
    try{
        const users = await User.find()

        if(users.length ===0){
            return res.status(404).json({
                message: 'No User found'
            })
        }

        res.status(200).json({
            message:'Users find successfully',
            result: users
        })

    }catch(err){
        res.status(500).json({ 
            error: 'There was a server side error',
            detail: err.message 
        });
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: user
        })

    }catch(err){
        res.status(500).json({ 
            error: 'There was a server side error',
            message: err.message 
        });
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const deleteUser = await User.deleteOne({_id: req.params.id})

        res.status(200).json({
            message: "User fetched successfully",
            data: deleteUser
        })

    }catch(err){
        res.status(500).json({ 
            error: 'There was a server side error',
            message: err.message 
        });
    }
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

// post multiple users
router.post('/all', async(req, res)=>{
    try{
        const userData = req.body
    const result = await User.insertMany(userData)

    res.status(201).json({
        message:"Multiple todo created successfully",
        data: result
    })
    }catch{
        res.status(500).json({
            error: "Maltiple insert failed",
            details:err.message
        })
    }
})

// put a user
router.put('/:id', async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true, runValidators: true}
    )

    if(!updatedUser){
        return res.status(404).json({
            message:"User not found",
        })
    }

    res.status(200).json({
        message:"Todo updated done",
        data: updatedUser
    })

    }catch(err){
        res.status(500).json({
            error: "server side problem",
            detail: err.message
        })
    }
})


module.exports = router;
