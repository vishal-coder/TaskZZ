import express from "express";
import { updateClient } from "../controller/ClientController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default request made");
});

router.patch("/:ClientId", updateClient);

export const clientRouter = router;
