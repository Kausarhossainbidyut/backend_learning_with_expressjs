const express = require('express');

const app = express(); 

app.set('view engine', 'ejs');

app.get('/about', (req, res) => {
    console.log(res.headersSent);  // false before sending the response
    
    res.render('pages/about',{ // res.render to render EJS template
        name: 'Kausar Hossain Bidyut' // local variable to be used in the EJS template
    });
    console.log(res.headersSent);  // true after sending the response
}); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});