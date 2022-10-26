import express from "express";
import { createAgency } from "../controller/AgencyController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default request made");
});

router.post("/", createAgency);

export const agencyRouter = router;
