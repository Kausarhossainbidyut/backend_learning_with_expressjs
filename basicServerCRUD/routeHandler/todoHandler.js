const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schema/todoSchema');

const Todo = mongoose.model('Todo', todoSchema);

// get all the todos
router.get("/", async (req, res) => {
  try {
    // শুধু pending todos আনবে
    const todos = await Todo.find({ status: "pending" })
      .select({
        _id: 0,   // _id exclude
        date: 0,  // date exclude
      })
      .limit(2);  // শুধু প্রথম ২ টা রেকর্ড আনবে

    //  যদি কোনো todo না থাকে
    if (todos.length === 0) {
      return res.status(404).json({
        message: "No todos found",
      });
    }

    // ✅ Success Response
    res.status(200).json({
      message: "Todos retrieved successfully",
      result: todos,
    });

  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});

// get a todo by id
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo fetched successfully",
      data: todo,
    });

  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
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