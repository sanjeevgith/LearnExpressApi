const express = require("express");
const cors = require("cors");
const open = require('open');
require("dotenv").config();


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









