const userHandler = (req,res)=>{
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
     console.log(req.app.secure); // resulted false as it's not secure

     req.app.secure=true; // setting a custom property on req.app object
     
     

    res.send(`User ID is ${req.params.id}`)
}


module.exports = userHandler