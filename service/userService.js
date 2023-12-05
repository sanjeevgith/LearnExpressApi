const { User } = require("../_helpers/db");
const CryptoJS = require("crypto-js");


module.exports = {
  demo,
  checkUserExistence,
  saveuser,
  updatuser,
  deleteuser,
  getalluser,
  getUserById,
};

//test function
async function demo() {
  return await "<h1>test api is working </h1>";
}

async function checkUserExistence(userId) {
  try {
    const existingUser = await User.findById(userId);
    return !!existingUser;
  } catch (error) {
    throw new Error("Error checking user existence");
  }
}




async function saveuser(userdata,file) {
  // console.log("userdata==>",userdata);
  // console.log("file==>",file);
  try {
    const newuser = new User({
      usercode: userdata.usercode,
      companycode: userdata.companycode,
      name: userdata.name,
      email: userdata.email,
      contact: userdata.contact,
      dob: userdata.dob,
      password: CryptoJS.AES.encrypt(
        userdata.password,
        process.env.PASS_SECRETKEY
      ).toString(),
      role: userdata.role,
      isActive: userdata.isActive,
      profile_img: {
        imagename:file.originalname,
        path:file.path
      },
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
    console.log("newuser==>",newuser);
    const savedUser = await newuser.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}


async function updatuser(userid, userdata) {
  // console.log("====>",userid,userdata);
  try {
    const savedUser = await User.findByIdAndUpdate(userid, userdata);
    return savedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
}

async function deleteuser(userid) {
  try {
    const delUser = await User.findByIdAndDelete(userid);
    return delUser;
  } catch {
    throw new Error("Error deleting user");
  }
}

async function getalluser() {
  try {
    const getallUser = await User.find();
    return getallUser;
  } catch {
    throw new Error("Error getting all user user");
  }
}

async function getUserById(userid) {
  try {
    !userid && res.status(401).json("Wrong credentials!");
    // console.log("userid",userid);
    const getUser = await User.findById(userid);
    // console.log("getUser",getUser);
    return getUser;
  } catch {
    throw new Error("Error getUserById");
  }
}
