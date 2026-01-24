const express = require('express');
const multer = require('multer');


// file upload folder 
const UPLOADS_FOLDER = './uploads/';

// prepare the final multer upload object
const upload = multer({
    dest: UPLOADS_FOLDER,
    limits: {
        fileSize: 1024 * 1024 * 1 // 1 MB file size limit
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' || 
            file.mimetype === 'image/jpg' || 
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        }else{
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const app = express();
/*  
upload.single() is used for single file upload, code is upload.single('avatar')
avatar is the name of the file input field
*/
/*
 upload.array() is used for multiple file upload, code is upload.array('avatar' , 3) here avatar is the name of the file input field and 3 is the max number of files to be uploaded
*/
/**
 * upload multiple fields with different names one is avatar and other is gallery code is upload.fields([
 * {name : 'avatar' , maxCount : 1}, 
 * {name : 'gallery' , maxCount : 2}
 * ])
 * 
 */

/**
 * upload.none() is used when there is no file upload but we want to use multer for other purposes like parsing form data
 */

app.post('/', upload.single('avatar'), (req,res)=>{
    res.send("hello world");
})


//  error handling middleware
app.use((err, req, res, next) => {
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send("There was an upload error.!")
        }else{ // next day start from here
            res.status(500).send(err.message);
        }
    }else{
        res.send("Success");
    }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});