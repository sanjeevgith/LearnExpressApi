const { Employee } = require("../_helpers/db");
const CryptoJS = require("crypto-js");


module.exports = {
  getAllEmployee,
  getEmployeeById,
  setemployee,
  updateemp,
  deleteemp,
};

async function getAllEmployee() {
  try {
    const getAlluser = await Employee.find();
    return getAlluser;
  } catch {
    throw new Error("Error in getting all employee");
  }
}

async function getEmployeeById(empid) {
  try {
    const getemp = await Employee.findById(empid);
    return getemp;
  } catch {
    throw new Error("Error in getting employee");
  }
}

async function setemployee(empdata) {
  try {
    const newemp = new Employee({
      empcode: empdata.usercode,
      name: empdata.name,
      email: empdata.email,
      contact: empdata.contact,
      dob: empdata.dob,
      password: CryptoJS.AES.encrypt(
        empdata.password,
        process.env.PASS_SECRETKEY
      ).toString(),
      isActive:empdata.isActive,
      profile_img:empdata.profile_img,
      role: empdata.role,
      address: {
        addressline: empdata.addressline,
        city: empdata.city,
        state: empdata.state,
        country: empdata.country,
      },
      identity_proof: {
        pan_no: empdata.pan_no,
        adhaar_no: empdata.adhaar_no,
      },
      bank_account: {
        ifsc_code: empdata.ifsc_code,
        account_name: empdata.account_name,
        account_number: empdata.account_number,
        bank_name: empdata.bank_name,
        branch_name: empdata.branch_name,
      },
    });
    // console.log("newemp", newemp);
    const savedEmp = await newemp.save();
    return savedEmp;
  } catch {
    throw new Error("Error creatinf emplyee");
  }
}

async function updateemp(empid, empdata) {
  try {
    const savedEmp = await Employee.findByIdAndUpdate(empid, empdata);
    return savedEmp;
  } catch {
    throw new Error("Error updating employee");
  }
}

async function deleteemp(empid) {
  try {
    const deletedemp = await Employee.findByIdAndDelete(empid);
    return deletedemp;
  } catch {
    throw new Error("Error deleting employee");
  }
}
