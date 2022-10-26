import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  ClientId: {
    type: String,
    required: true,
    unique: true,
  },
  AgencyId: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  TotalBill: {
    type: Number,
    required: true,
  },
});

let validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
