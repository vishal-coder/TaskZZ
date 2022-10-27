import express from "express";
import { login } from "../controller/UserController.js";

const router = express.Router();

router.post("/login", login);

export const userRouter = router;
