// with express
const express = require('express')

const app = express()

// app.use(express.json())
// app.use(express.raw())
app.use(express.text())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.post('/', (req, res)=>{
    console.log(req.body);
    res.send('This is post route');
    
})
app.listen(3000, ()=>{
    console.log("server is runing on port 3000");
    
})