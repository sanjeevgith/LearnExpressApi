const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const userAuthService = require("../service/userAuthService");
const multer = require("multer");
const path = require('path');

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAdminFullcontrol,
} = require("../middleware/verifyToken");

// router.use(verifyToken)

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

router.get(
  "/getUserByid/:_id",
  verifyToken,
  verifyTokenAndAdmin,
  async (req, res) => {
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
  }
);

router.get(
  "/getalluser",
  verifyToken,
  verifyTokenAndAdminFullcontrol,
  async (req, res) => {
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
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File name
  },
});
const upload = multer({ storage: storage });

router.post(
  "/register",
  verifyToken,
  verifyTokenAndAdminFullcontrol,
  upload.single('file'),
  async (req, res) => {
    const userpostdata = req.body.jsonData;  //pass userpostdata directly into saveuser() if we use frontend
    const jsonData = JSON.parse(userpostdata);
    const file = req.file;
    try {
      const newUser = await userService.saveuser(jsonData,file);
      res
        .status(200)
        .json({ type: "success", msg: "User created", data: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ type: "error", msg: "Server error" });
    }
  }
);



router.put(
  "/updateuser/:_id",
  verifyToken,
  verifyTokenAndAdmin,
  upload.single('file'),
  async (req, res) => {
    const userId = req.params._id;
    const userDataToUpdate = req.body;
    userDataToUpdate.file = req.file;
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
  }
);

router.delete(
  "/deleteuser/:_id",
  verifyToken,
  verifyTokenAndAdmin,
  async (req, res) => {
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
  }
);

router.post("/login", async (req, res) => {
  try {
    const logindataEmail = req.body.email;
    const logindataPassword = req.body.password;
    let loginDetails = await userAuthService.login(
      logindataEmail,
      logindataPassword
    );
    res
      .status(200)
      .json({ type: "success", msg: "User Login Details", data: loginDetails });
  } catch (error) {
    res.status(401).json({ type: "error", msg: "Server error" });
  }
});

module.exports = router;
