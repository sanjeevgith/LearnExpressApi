const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const userAuthService = require("../service/userAuthService");

//test api
router.get("/getuser", (req, res) => {
  userService
    .demo()
    .then((r) => {
      res.send(r);
    })
    .catch((err) => {
      console.log(err);
    });
});
//test end

router.get("/getUserByid/:_id", async (req, res) => {
  const userId = req.params._id;
  try {
    if (!userId) {
      return res.status(400).json({ message: "Please provide user id" });
    }
    const Getuserbyid = await userService.getUserById(userId);
    console.log(Getuserbyid);
    res
      .status(200)
      .json({ type: "success", msg: "Get User By Id", data: Getuserbyid });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.get("/getalluser", async (req, res) => {
  try {
    const alluser = await userService.getalluser();
    res.status(200).json({
      type: "success",
      msg: "all user fetched",
      data: alluser,
    });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.post("/saveuser", async (req, res) => {
  const userpostdata = req.body;
  try {
    const newUser = await userService.saveuser(userpostdata);
    res
      .status(200)
      .json({ type: "success", msg: "User created", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.put("/updateuser/:_id", async (req, res) => {
  const userId = req.params._id;
  const userDataToUpdate = req.body;
  //   console.log('userId', userId)
  //   console.log("userDataToUpdate",userDataToUpdate);
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ type: "warning", msg: "Please provide user ID" });
    }
    const updateData = await userService.updatuser(userId, userDataToUpdate);
    res
      .status(201)
      .json({ type: "success", msg: "User updated", data: updateData });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.delete("/deleteuser/:_id", async (req, res) => {
  const userId = req.params._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ type: "warning", msg: "please provide user id" });
    }
    const deletuser = await userService.deleteuser(userId);
    res.status(200).json({
      type: "success",
      msg: "user deleted successfully",
      data: deletuser,
    });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const logindataEmail = req.body.email;
    const logindataPassword = req.body.password;
    let loginDetails = await userAuthService.login(logindataEmail,logindataPassword);
    res
      .status(200)
      .json({ type: "success", msg: "User Login Details", data: loginDetails });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});



module.exports = router;
