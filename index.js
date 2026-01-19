// with express
const express = require('express')

const app = express() // the main app
const admin = express() // the sub app

// app.use(express.json())
// app.use(express.raw())
// app.use(express.text())
// app.use(express.urlencoded())
// app.use(express.static(`${__dirname}/image`))

admin.get('/dashboard',(req,res)=>{
    res.send('This is the admin dashboard')
})

app.get('/',(req,res)=>{
    res.send('Main App')
})

app.use('/admin', admin)

app.listen(3000, ()=>{
    console.log("server is runing on port 3000");
    
})