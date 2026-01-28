const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schema/todoSchema');

const Todo = mongoose.model('Todo', todoSchema);

// get all the todos
router.get('/', async(req, res) => {
    res.send('Get all todos');
});

// get a todo by id
router.get('/:id', async(req, res) => {

});

//  Create new todo
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully",
      data: savedTodo,
    });

  } catch (err) {
    res.status(500).json({
      error: "Todo create failed",
      details: err.message,
    });
  }
});

// post multiple todos
router.post('/all', async(req, res) => {

});

// put update a todo by id
router.put('/:id', async(req, res) => {

});


// delete a todo by id
router.delete('/:id', async(req, res) => {
    
});


module.exports = router;