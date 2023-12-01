const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/learnexpressapi", {
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useNewUrlParser: true,
})
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err,{err:"not connected"});
});



module.exports={
    User : require('../models/userModel'),
    Employee : require('../models/employeeModel')
};