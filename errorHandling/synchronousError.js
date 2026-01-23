// error handling middleware explained

const express = require('express');

const app = express()

app.get('/', (req,res)=>{
    for(let i = 0; i<10; i++){
        if(i==5){
            next('there was a error')
        }else{
            res.write('a')
        }
    }
    res.end()
    // throw new Error("there was an error")
    // res.send(a)
})

// 404 not found (write this middleware after all route)
app.use((req,res,next)=>{
    // res.status(404).send("Requested url not found")
    next("Requested url not found")
})

// // last middleware function
// app.use((err, req, res, next)=>{
//     if(err.message){
//         res.status(500).send(err.message)
//     }else{
//         res.status(500).send('There was an error!')
//     }
// })

app.use((err, req, res, next)=>{
    if(res.headerSend){
        next("There was a problem")
    }else{
        if(err.message){
            res.status(500).send(err.message)
        }else{
            res.status(500).send('There was an error!')
        }
    }
})

app.listen(3000, ()=>{
    console.log("server is run on port 3000");
    
})