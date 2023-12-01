const express = require("express");
const router = express.Router();
const emplyeeSercive = require("../service/employeeService");
const verifyToken = require("../middleware/verifyToken")

// router.use(verifyToken);

router.post("/saveemp", async (req, res) => {
  const empfulldata = req.body;
  // console.log(empfulldata);
  try {
    const savedempdata = await emplyeeSercive.setemployee(empfulldata);
    res
      .status(200)
      .json({ type: "success", msg: "Employee created", data: savedempdata });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.get("/getAllEmp", async (req, res) => {
  try {
    const getallemp = await emplyeeSercive.getAllEmployee();
    res
      .status(200)
      .json({ type: "success", msg: "Get AllEmp", data: getallemp });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.get("/getAllEmp/:_id", async (req, res) => {
  const userid = req.params._id;
  try {
    const getempById = await emplyeeSercive.getEmployeeById(userid);
    res
      .status(200)
      .json({ type: "success", msg: "Get Emp By Id", data: getempById });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.put("/updateEmp", async (req, res) => {
  const empid = req.params._id;
  const empdata = req.body;
  try {
    if (!empid) {
      return res
        .status(400)
        .json({ type: "warning", msg: "Please provide empid ID" });
    }
    const updateemp = await emplyeeSercive.updateemp(userid, empdata);
    res
      .status(200)
      .json({ type: "success", msg: "Update Emp By Id", data: updateemp });
  } catch (error) {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

router.delete("/deleteemp/:_id", async (req, res) => {
  const empid = req.params._id;
  try {
    const delempdata = await emplyeeSercive.deleteemp(empid);
    res
      .status(200)
      .json({ type: "success", msg: "Delete Emp By Id", data: delempdata });
  } catch {
    res.status(500).json({ type: "error", msg: "Server error" });
  }
});

module.exports = router;
