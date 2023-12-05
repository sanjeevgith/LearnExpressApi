const express = require("express");
const cors = require("cors");
const open = require('open');
require("dotenv").config();

//server using node
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); 
  res.end('Hello, World!'); 
}).listen(4000, "127.0.0.1");
//end server 




const app = express();

app.use(express.json());



app.use(cors({ credentials: true, origin: "http://localhost:4200" }));



//api URL demo http://localhost:5000/api/userController/apiroutename
app.use('/api/userController', require('./controller/userController'));





//server running port 5000
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/userController/getuser`);
  // open(`http://localhost:${port}/api/userController/getuser`)
});









