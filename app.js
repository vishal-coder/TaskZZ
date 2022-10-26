import express from "express";
import { agencyRouter } from "./routes/agencyRoute.js";
import { clientRouter } from "./routes/clientRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/agency", agencyRouter);
app.use("/api/agency/client", clientRouter);
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
    mongoose
      .connect(MONGO_URL)
      .then(() => console.log("connected to mongoDB"))
      .catch((err) => console.error("Could not connect to mongoDB", err));
  } catch (error) {
    console.log("error while connecting to database", error);
  }
}

export const client = await createConnection();
