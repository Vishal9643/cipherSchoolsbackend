import express from "express";
import { googleAuth, signin, signup } from "../controllers/Auth.js";

const router = express.Router();

//CREATE A USER

router.post("/signup", signup);

//SIGN IN USER

router.post("/signin", signin);

//GOOGLE SIGN IN

router.post("/google", googleAuth);

export default router;
