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

//  Create multiple todos
router.post('/all', async (req, res) => {
  try {
    const todosData = req.body;

    const result = await Todo.insertMany(todosData);

    res.status(201).json({
      message: "Multiple todos created successfully",
      data: result,
    });

  } catch (err) {
    res.status(500).json({
      error: "Multiple insert failed",
      details: err.message,
    });
  }
});

// update a todo by id
router.put('all/:id', async (req, res) => {
  try {
    const result = await Todo.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      result: result
    });

  } catch (err) {
    res.status(500).json({
      error: "Todo update failed",
      details: err.message
    });
  }
});

// put update a todo by id using findByIdAndUpdate
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },   //  safe update
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });

  } catch (err) {
    res.status(500).json({
      error: "Todo update failed",
      details: err.message,
    });
  }
});




// delete a todo by id
router.delete('/:id', async(req, res) => {
    
});


module.exports = router;