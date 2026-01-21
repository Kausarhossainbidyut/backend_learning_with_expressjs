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

// now learning response methods
app.get("/detail", (req, res) => {
    
    // res.send("<h1>This is detail page</h1>"); // sends the response to the client
    // res.end(); // ends the response process
    // res.json({
    //     name: "Kausar Hossain Bidyut",
    //     age: 24,
    //     profession: "Web Developer" 
    // }); // sends a JSON response

    // res.status(201).send("Resource created successfully").end() // sets the status code and sends the response and ends the response process

    // res.sendStatus(404); // sets the status code and sends the corresponding status message as the response

    res.format({ // performs content negotiation based on the Accept header
        'text/plain': () => {
            res.send('This is a plain text response');
        },
        'text/html': () => {
            res.send('<h1>This is an HTML response</h1>');
        }, 
        'application/json': () => {
            res.json({ message: 'This is a JSON response' });
        },
        default: () => {
            res.status(406).send('Not Acceptable');
        }
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000 s');
});