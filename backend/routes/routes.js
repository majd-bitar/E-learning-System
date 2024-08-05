import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import classController from "../controllers/classController.js";
import withdrawalController from "../controllers/withdrawalController.js";
import fileController from "../controllers/fileController.js";


const adminMiddleware = authMiddleware.adminMiddleware;
const studentMiddleware= authMiddleware.studentMiddleware;
const router = express.Router();

// User Routes
const userRouter = express.Router();
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

// Student Routes related to class
const studentRouter = express.Router();
studentRouter.post('/enroll', studentMiddleware, classController.enrollClass);

// Student Routes related to file downloading
studentRouter.post('/download-file',studentMiddleware,fileController.downloadFile);

// Admin Routes
const adminRouter = express.Router();
adminRouter.post('/add-class', adminMiddleware, classController.addClass);
adminRouter.get('/list-students/:classID', adminMiddleware, classController.listStudents);
adminRouter.post('/upload-file/:classID', adminMiddleware, fileController.uploadFile);
adminRouter.post('/handle-withdrawal', adminMiddleware, withdrawalController.handleWithdrawal);

// Use the routers
router.use('/user', userRouter);
router.use('/student', studentRouter);
router.use('/admin', adminRouter);

export default router;
