import express from "express";
import {googleAuth, signin, signup} from "../Controllers/auth.js";
const router = express.Router();


//CREATE USER
router.post('/signup',signup)

//SIGNIN
router.post("/signin",signin);



//GOOGLE AUTH
router.post("/google",googleAuth);

export default router;
