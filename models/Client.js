import mongoose from "mongoose";
let validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const clientSchema = mongoose.Schema({
  ClientId: {
    type: String,
    required: [true, "Please enter a Client Id"],
    unique: true,
  },
  AgencyId: {
    type: String,
    required: [true, "Please enter a Ageny ID"],
  },
  Name: {
    type: String,
    required: [true, "Please enter a Client Name"],
  },
  Email: {
    type: String,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  PhoneNumber: {
    type: String,
    required: [true, "Please enter a Phone Number"],
  },
  TotalBill: {
    type: String,
    required: [true, "Please enter a Total Bill"],
  },
});

export const Client = mongoose.model("Client", clientSchema);
