const express = require('express');

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.send('Public Home Page');
}); 

publicRouter.get('/about', (req, res) => {
    res.send('Public About Page');
});

module.exports = publicRouter;