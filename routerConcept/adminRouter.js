const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.send('Admin Home Page');

})

adminRouter.get('/login', (req, res) => {
    res.send('Admin Login Page');
});

module.exports = adminRouter;