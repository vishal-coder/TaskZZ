import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default request made");
});
export const clientRouter = router;
