import { json } from "express";
import Class from "../models/classModel.js";


//student
const enrollClass = async (req,res)=>{

    try{
        const {classID} = req.body;
        const userID = req.user.id;

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


export default {enrollClass , addClass, listStudents} ;