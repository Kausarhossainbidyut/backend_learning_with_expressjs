// Request Object in Express.js
const express = require('express')

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

    
    res.send('This is the admin dashboard')
})
app.use('/admin',admin) 

app.get('/user/:id',(req,res)=>{
    // console.log('Base URL:', req.baseUrl); // resulted base URL: blank as it's not in a router
    // console.log('Original Url', req.originalUrl); // resulted original URL: /user/123
    // console.log(('Url', req.url)); // resulted URL: /user/123
    // console.log("Path", req.path); // resulted Path: /user/123 but main app will give /user/123 and not present query parameters 
    // console.log('Hostname:', req.hostname); // resulted Hostname: localhost
    // console.log('IP Address:', req.ip); // resulted IP Address: ::1
    // console.log('Method', req.method); // resulted Method: GET
    // console.log('Protocol', req.protocol); // resulted Protocol: http
    // console.log('Query Parameters', req.query); // resulted Query Parameters: { name: 'John', age: '30' } 
    // console.log('Query', req.query); // given query parameters in object form
    // console.log('Params', req.params); // given params in object form
     console.log(req.secure); // resulted false as it's not secure
     

    res.send(`User ID is ${req.params.id}`)
})

app.post('/submit',(req,res)=>{

    console.log('Body:', req.body); // resulted Body: Body: { name: 'Bidyut', age: 23 }
    
    res.send('Form submitted successfully')
    
})

app.get('/',(req,res)=>{
    res.send('This is the home pages')
})



app.listen(3000,()=>{
    console.log('Server is running on port 3000 s');
})
