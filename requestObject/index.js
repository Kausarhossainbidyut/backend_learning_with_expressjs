// Request Object in Express.js
const express = require('express')
const userHandler = require('../requestObject/handler/userHandler')

const app = express() 
app.use(express.json()) // to parse JSON request bodies

const admin= express.Router()


// req.baseUrl this property returns the matched part of the URL for a router or a sub app

admin.get('/dashboard',(req,res)=>{
    // console.log(req.baseUrl); // resulted base URL: /admin 
    // console.log(req.originalUrl); // resulted original URL: /admin/dashboard
    // console.log(('Url', req.url)); // resulted URL: /dashboard
    // console.log("Path", req.path); // resulted Path: /dashboard but main app will give /admin/dashboard
    // console.log(req.hostname); // resulted Hostname: localhost
    // console.log('IP Address:', req.ip); // resulted IP Address: ::1
    // console.log("Method", req.method); // resulted Method: GET
    // console.log('Protocol', req.protocol); // resulted Protocol: http
    // console.log('Query Parameters', req.query); // resulted Query Parameters: {}
    // console.log('Query', req.query); // given query parameters in object form
    // console.log('Params', req.params); // given params in object form
    console.log(req.accepts('json')); // resulted true if the request content type is json
    
    res.send('This is the admin dashboard')
})
app.use('/admin',admin) 

app.get('/user/:id',userHandler)

app.post('/submit',(req,res)=>{

    // console.log('Body:', req.body); // resulted Body: Body: { name: 'Bidyut', age: 23 }
    // console.log(req.route); // resulted Route: { path: '/submit', stack: [ [Layer] ] } an object containing the path and stack of middleware functions for this route
    
    // req.method
    // console.log(req.accepted('html')); // resulted true if the request accepts html response type
     // resulted true if the request content type is json
    
    res.send('Form submitted successfully')
    
})

app.get('/',(req,res)=>{
    res.send('This is the home pages')
})



app.listen(3000,()=>{
    console.log('Server is running on port 3000 s');
})
