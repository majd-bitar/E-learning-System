import { json } from "express";
import Class from "../models/classModel.js";
import Withdrawal from "../models/withdrawalModel.js"

//student
const enrollClass = async (req,res)=>{

    try{
        const {classID} = req.params;
        const userID = req.user.id; // extr user ID from the decoded token

        const updatedClass = await Class.findByIdAndUpdate(classID,{$addToSet:{students:userID}},{new:true});

        if(!updatedClass){
            return res.status(404).json({message:"Class not found"});
        }

        res.json({message:"Enrolled successfully",updatedClass});

    }catch(e){
        res.status(500),json({message:"Enrolled successfully",updateClass});
    }
};

//admin
const addClass = async (req,res)=>{
    try{
        const {name,description} = req.body;
        const newClass = new Class({name,description});
        await newClass.save();
        res.status(201,{message:"Class created successfully"})
    }catch(e){
        res.status(500).json({message:e.message});
    }
}

//admin
const listStudents = async (req, res) => {
    try {
        const { classID } = req.params; 
        const targetClass = await Class.findById(classID).populate('students'); 
        if (!targetClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json(targetClass.students); 
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

//student
const getAllClasses = async (req, res) => {
    try {
        // Find all classes that are associated with any withdrawal form
        const withdrawnClasses = await Withdrawal.find().select('class');

        // Get an array of class IDs that have any withdrawal requests
        const withdrawnClassIDs = withdrawnClasses.map(withdrawal => withdrawal.class.toString());

        // Find all classes that are not in the withdrawnClassIDs array
        const classes = await Class.find({ _id: { $nin: withdrawnClassIDs } });

        res.status(200).json(classes);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


//student
const getEnrolledClasses = async (req, res) => {
    try {
        const userID = req.user.id; // Extract user ID from the decoded token
        
        // Find all classes where the student is enrolled
        const enrolledClasses = await Class.find({ students: userID });

        // Find classes where the student has submitted a withdrawal request with status 'pending' or 'approved'
        const withdrawnClasses = await Withdrawal.find({ 
            user: userID, 
            status: { $in: ['pending', 'approved'] }
        }).select('class');

        const withdrawnClassIDs = withdrawnClasses.map(withdrawal => withdrawal.class.toString());

        // Filter out the classes that have a pending or approved withdrawal request
        const activeEnrolledClasses = enrolledClasses.filter(enrolledClass => !withdrawnClassIDs.includes(enrolledClass._id.toString()));

        res.status(200).json(activeEnrolledClasses);
    } catch (error) {
        console.error('Error fetching enrolled classes:', error);
        res.status(500).json({ message: 'Error fetching enrolled classes' });
    }
};

export default {enrollClass , addClass, listStudents, getAllClasses, getEnrolledClasses} ;