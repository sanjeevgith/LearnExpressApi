const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    usercode: { type: String },
    companycode: { type: String },
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    address: {
      addressline: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    dob: { type: Date },
    identity_proof: {
      pan_no: { type: String },
      adhaar_no: { type: String },
    },
    bank_account: {
      ifsc_code: { type: String },
      account_name: { type: String },
      account_number: { type: String },
      bank_name: { type: String },
      branch_name: { type: String },
    },
    isActive: { type: Boolean },
    profile_img: {
      imagename: { type: String },
      path: { type: String },
    },
    password: { type: String },
    role: {
      type: [
        {
          type: Array,
          enum: ["user", "admin"],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userModel", userSchema, "usermodel");
