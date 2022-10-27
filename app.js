import express from "express";
import { agencyRouter } from "./routes/agencyRoute.js";
import { clientRouter } from "./routes/clientRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/agency", agencyRouter);
app.use("/api/agency/client", clientRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
app.listen(3000, () => {
  console.log("listening at port 3000");
});

app.get("/", (req, res) => {
  res.send("default request made");
});

async function createConnection() {
  try {
    // let conn = null;
    await mongoose
      .connect(MONGO_URL)
      .then(() => {
        console.log("connected to mongoDB");
        // conn = mongoose.connection;
        // console.log("conn", conn);
      })
      .catch((err) => console.error("Could not connect to mongoDB", err));

    // const conn = mongoose.connection;

    // conn.on("error", () => console.error(console, "connection error"));

    // conn.once("open", () =>
    //   console.info("Connection to Database is successful")
    // );
    return mongoose.connection;
    // console.log("conn", conn);
  } catch (error) {
    console.log("error while connecting to database", error);
  }
}

export const dbConnection = await createConnection();

// "AgencyId":"1", "Name":"", "Address1":"", "Address2":"", "State":"", "City":"", "PhoneNumber":""
