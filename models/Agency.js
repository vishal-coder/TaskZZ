import mongoose from "mongoose";
const { Schema } = mongoose;
const agencySchema = new Schema({
  AgencyId: {
    type: String,
    unique: true,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Address1: {
    type: String,
    required: true,
  },
  Address2: {
    type: String,
  },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
});

const Agency = mongoose.model("Agency", agencySchema);
