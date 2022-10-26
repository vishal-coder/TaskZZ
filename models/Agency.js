import mongoose from "mongoose";
const { Schema } = mongoose;
const agencySchema = new Schema({
  AgencyId: {
    type: String,
    unique: true,
    required: [true, "Please enter an AgencyID"],
  },
  Name: {
    type: String,
    required: [true, "Please enter an Agency Name"],
  },
  Address1: {
    type: String,
    required: [true, "Please enter an Agency address 1"],
  },
  Address2: {
    type: String,
  },
  State: {
    type: String,
    required: [true, "Please enter a State"],
  },
  City: {
    type: String,
    required: [true, "Please enter a City"],
  },
  PhoneNumber: {
    type: String,
    required: [true, "Please enter a Phone Number"],
  },
});

export const Agency = mongoose.model("Agency", agencySchema);
