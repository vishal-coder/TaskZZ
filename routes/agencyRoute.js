import express from "express";
import {
  createAgency,
  topClientAgency,
} from "../controller/AgencyController.js";
import { verifyAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", verifyAuth, createAgency);
router.get("/", verifyAuth, topClientAgency);

export const agencyRouter = router;
