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

    res.send(`Agency and clienet Created Successfully`);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    let err;
    let statusCode = 400;
    if (error.message.includes("Agency validation failed")) {
      err = {};
      Object.values(error.errors).forEach((errors) => {
        err[errors.properties.path] = errors.properties.message;
      });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      err = "";
      statusCode = 409;
      err +=
        error.message.slice(0, error.message.indexOf(":")) +
        " " +
        error.message.slice(error.message.indexOf("{"));
    } else {
      err[error.name] = error.message;
      statusCode = 500;
    }

    res.status(statusCode).send(err);
  } finally {
    session.endSession();
  }
};

export const topClientAgency = async (req, res) => {
  try {
    var group = {
      $group: {
        _id: "$TotalBill",
        fullDocument: { $push: "$$ROOT" },
      },
    };

    var sort = { $sort: { _id: -1 } };
    var limit = { $limit: 1 };

    const agency = await Client.aggregate([
      {
        $lookup: {
          from: "agencies",
          localField: "AgencyId",
          foreignField: "AgencyId",
          as: "AgencyDoc",
        },
      },
      { $unwind: "$AgencyDoc" },
      {
        $project: {
          _id: false,
          AgencyName: "$AgencyDoc.Name",
          ClientName: "$Name",
          TotalBill: "$TotalBill",
        },
      },
      group,
      sort,
      limit,
      { $unwind: "$fullDocument" },
      {
        $project: {
          _id: false,
          AgencyName: "$fullDocument.AgencyName",
          ClientName: "$fullDocument.ClientName",
          TotalBill: "$fullDocument.TotalBill",
        },
      },
    ]);

    if (!agency) {
      res.status(404).send("Data for given client id not found");
    }

    res.send(agency);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
