// with express
const express = require('express')

const app = express() // the main app
// const admin = express() // the sub app

// app.use(express.json())
// app.use(express.raw())
// app.use(express.text())
// app.use(express.urlencoded())
// app.use(express.static(`${__dirname}/image`))

// admin.get('/dashboard',(req,res)=>{
//     res.send('This is the admin dashboard')
// })

// now learn method app.use() to mount the sub app to the main app

//app.disable this is used to disable a specific middleware like case sensitive routing
// app.disable('case sensitive routing')

// app.disabled('case sensitive routing') will return true if the middleware is disabled
console.log(app.disabled('case sensitive routing'));

//app.enable this is used to enable a specific middleware like case sensitive routing
app.enable('case sensitive routing')

// app.enabled('case sensitive routing') will return true if the middleware is enabled
console.log(app.enabled('case sensitive routing'));


//app.all this is work s for all method get, post ,put ,delete
app.all('',(req,res)=>{
    console.log('This is the middleware for all method');
    res.send('This is the middleware for all method')
})

//app.delete this is work for delete method
app.delete('/delete',(req,res)=>{
    console.log('This is the middleware for delete method');
    res.send('This is the middleware for delete method')
})


// app.get & app.set this is work for get method and set a value for a specific key
app.set('title','My Express App')
console.log(app.get('title'));

// app.get this is work for get method
app.get('/',(req,res)=>{
    res.send('This is the home page')
})

// app.get this is work for get method
// app.METHOD this is used to get the specific method like app.get, app.post, app.put, app.delete
// here METHOD is a placeholder for the specific HTTP method

// app.param this is used to get the specific param from the url
app.param('id',(req,res,next,id)=>{
    const user={
        id:id,name:'John Doe',age:30
    }
    req.userDetails=user
    console.log(`The id is ${id}`);
    next()
})

/// app.get this is work for get method with param and we can access the param using req.params
app.get('/user/:id',(req,res)=>{
    console.log(req.userDetails);
    res.send(`The user id is ${req.params.id}`)
})

app.get('/about',(req,res)=>{
    res.send('This is the about page')
})

// app.use('/admin', admin)

app.listen(3000, ()=>{
    console.log("server is runing on port 3000");
    
})