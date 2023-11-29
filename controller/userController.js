const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const { user } = require("../_helpers/db");

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
  try {
    if (!agentId) {
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

module.exports = router;
