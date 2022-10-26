import { dbConnection } from "../app.js";
import { Agency } from "../models/Agency.js";
import { Client } from "../models/Client.js";

export const createAgency = async (req, res) => {
  const session = await dbConnection.startSession();
  session.startTransaction();

  try {
    const { agency, client } = req.body;
    console.log("agency", agency);

    await Agency.create([{ ...agency }], { session });
    await Client.create([{ ...client }], { session });
    await session.commitTransaction();

    res.send(`Agency Created Successfully`);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    const err = handleErrors(error);
    console.log("err", err);
    res.status(400).send(err);
  } finally {
    session.endSession();
  }
};

export const agencyDetails = async (req, res) => {
  try {
    // check if ageny exist if not send 404
    //else send response
  } catch (error) {
    console.error(error);
  }
};

const handleErrors = (error) => {
  let err = {};
  console.log("error.name", error.name);
  console.log("error.name", error.message);

  if (error.message.includes("Agency validation failed")) {
    Object.values(error.errors).forEach((errors) => {
      err[errors.properties.path] = errors.properties.message;
    });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    return (err["agencyId"] =
      error.message.slice(0, error.message.indexOf(":")) +
      " " +
      error.message.slice(error.message.indexOf("{")));
  } else {
    err[error.name] = error.message;
  }

  return err;
};
