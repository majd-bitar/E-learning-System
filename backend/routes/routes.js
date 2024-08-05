import express from "express";
import userController from "../controllers/userController.js";
import { adminMiddleware, studentMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

//User Routes
router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);


//user Routes related to class
router.post('/enroll', studentMiddleware, classController.enrollInClass);


//Admin Routes
router.post('/add-class', adminMiddleware, adminController.addClass);
router.get('/list-students/:classId', adminMiddleware, adminController.listStudentsInClass);
router.post('/upload-files', adminMiddleware, adminController.uploadFiles);
router.post('/handle-withdrawal', adminMiddleware, adminController.handleWithdrawal);

export default router;