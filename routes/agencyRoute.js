import express from "express";
import {
  createAgency,
  topClientAgency,
} from "../controller/AgencyController.js";

const router = express.Router();

router.post("/", createAgency);
router.get("/", topClientAgency);

export const agencyRouter = router;
