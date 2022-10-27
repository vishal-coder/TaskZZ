import express from "express";
import { updateClient } from "../controller/ClientController.js";
import { verifyAuth } from "../middleware/Auth.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default request made");
});

router.patch("/:ClientId", verifyAuth, updateClient);

export const clientRouter = router;
