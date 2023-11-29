const { User } = require("../_helpers/db");
const mongoose = require('mongoose')

module.exports = {
  demo,
  checkUserExistence,
  saveuser,
  updatuser,
  deleteuser,
  getalluser,
};

//test function
async function demo() {
  return await "demo called";
}

async function checkUserExistence(userId) {
  try {
    const existingUser = await User.findById(userId);
    return !!existingUser;
  } catch (error) {
    throw new Error("Error checking user existence");
  }
}

async function saveuser(userdata) {
  // console.log("userdata===> ",userdata);
  try {
    const newuser = new User({
      name: userdata.name,
      email: userdata.email,
      contact: userdata.contact, 
      dob: userdata.dob,
      password: userdata.password,
      role: userdata.role,
      address: { 
        addressline: userdata.addressline,
        city: userdata.city,
        state: userdata.state,
        country: userdata.country,
      },
      identity_proof: {
        pan_no: userdata.pan_no,
        adhaar_no: userdata.adhaar_no,
      },
      bank_account: {
        ifsc_code: userdata.ifsc_code,
        account_name: userdata.account_name,
        account_number: userdata.account_number,
        bank_name: userdata.bank_name,
        branch_name: userdata.branch_name,
      },
    });
    console.log("newuser",newuser);
    const savedUser = await newuser.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}



async function updatuser(userid,userdata){
  // console.log("====>",userid,userdata);
  try {
    const savedUser = await User.findByIdAndUpdate(userid,userdata);
    return savedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
}



async function deleteuser(userid){
  try{
    const delUser = await User.findByIdAndDelete(userid);
    return delUser;
  }catch{
    throw new Error("Error deleting user");
  }
}


async function getalluser(){
  try{
   const getallUser = await User.find();
   return getallUser;
  }catch{
    throw new Error("Error getting all user user");
  }
}