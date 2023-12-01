const { User } = require("../_helpers/db");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


module.exports = {
  login,
};

async function login(email,password_) {
  try {
    //find one accept object
    let user = await User.findOne({email:email});
    // console.log('user', user)
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SECRETKEY
    );
    const OrifinalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
    OrifinalPassword !== password_ &&
    res.status(401).json("Wrong Credentials!");

    const accessToken = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRETKEY,
        { expiresIn: "30d" }
    );
     //hide password column
     //user._doc  is use to create a new object ...others estructuring assignment combined with the rest operator
     const { password, ...others } = user._doc;
     //end hide password

    return { user: others, accessToken };
    //return user;
  } catch (error) {
    throw new Error("Error getUserById");
  }
}
