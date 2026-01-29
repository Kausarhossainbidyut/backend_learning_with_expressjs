const express = require('express');
const userHandler = require('./routeHandling/userHandler');
const app = express();

app.use(express.json());

// Mount the userHandler router at the /user path
app.use('/user',userHandler)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});