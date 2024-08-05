import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

//User Routes
router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);


export default router;