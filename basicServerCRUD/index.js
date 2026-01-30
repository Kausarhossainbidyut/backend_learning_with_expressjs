const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv')

const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();
dotenv.config({ path: path.resolve(__dirname, '../.env') })
app.use(express.json());

// database connection with mongoose
mongoose.connect('mongodb://localhost:27017/todos') 
    .then(()=> console.log("Successfully Connected to MongoDB"))
    .catch((err) => console.log( err))


// application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



// define error handling middleware
const errorHandler = (err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }
    res.status(500).json({ error: err });
}

app.use(errorHandler)
app.listen(3000, () => {
  console.log(' Server is running on port 3000');
});