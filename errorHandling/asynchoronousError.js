const { log } = require('console')
const e = require('express')
const express = require('express')
const fs = require('fs')
const { set } = require('mongoose')

const app = express()

// app.get('/', (req,res,next)=>{
//     fs.readFile('/file-does-not-exist', (err, data) => {
//         if(err){
//             return next(err)
//         }
//         res.send(data)
//     })
// })

// custom error handling middleware

// // example of asynchronous error
// app.get('/', (req,res,next)=>{
//     setTimeout(()=>{
//         try{
//             console.log(a);
            
//         }catch(err){
//             next(err)
//         }
//     },100)
// })

// app.get('/', (req,res,next)=>{
//     // synchronous error
//     fs.readFile('/file-does-not-exist', (err, data) => {
//         console.log(data);
//         next(err)
//         console.log(data.property);
        
//     })
// })

app.get('/', [
    (req,res,next)=>{
        fs.readFile('/file-does-not-exist', 'utf8', (err, data) => {
            console.log(data);
            next(err)
        })

    },
    (req,res,next)=>{
        // synchronous error
        console.log(data.property);
    }
])
app.use((err, req, res, next)=>{
    if(res.headersSent){
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