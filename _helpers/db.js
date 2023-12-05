const mongoose = require('mongoose');


const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
//   useCreateIndex: false,
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
};