
const express = require('express');

const publicRouter = express.Router();


// router perterns with middleware


// publicRouter.use((req, res, next) => {
//     console.log('Public Router Middleware');
//     next();
// });


// publicRouter.get('/', (req, res) => {
//     res.send('Public Home Page');
// });

// publicRouter.route('/user')
//     .all((req, res, next) => {
//         console.log('Middleware for /user route');
//         next();
//     })
//     .get((req, res) => {
//         res.send('Public User GET Page');
//     })
//     .post((req, res) => {
//         res.send('Public User POST Page');
//     })
//     .put((req, res) => {
//         res.send('Public User PUT Page');
//     })
//     .delete((req, res) => {
//         res.send('Public User DELETE Page');
//     });

// const log = (req, res, next) => {
//     console.log(`I am logging something `);
//     next();
// }

// publicRouter.all('*', log);
// publicRouter.param('user', (req, res, next, id) => { // middleware for :user param
//     req.user = id === '1' ? 'Admin User' : 'Normal User';
//     next();
// });

// publicRouter.param((param, option) => (req, res, next, value) => {
//     // Custom logic based on param and option
//     if(value === option){
//         next();
//     }else{
//         res.sendStatus(403); // Forbidden
//     }
//     next();
// });

// publicRouter.param('user', '12'); // middleware for :user param if user equals 12 then proceed otherwise block

// publicRouter.get('/:user', (req, res) => {
//     res.send(`Hello admin`);
// }); 

// publicRouter.get('/about', (req, res) => {
//     res.send('Public About Page');
// });

module.exports = publicRouter;