import { json } from "express";
import Class from "../models/classModel.js";

const enrollClass = async (req,res)=>{

    try{
        const {classID} = req.body;
        const userID = req.user.id;

        //add user to class
        const updatedClass = await Class.findByIdAndUpdate(classID,{$addToSet:{students:userID}},{new:true});

        if(!updatedClass){
            return res.status(404).json({message:"Class not found"});
        }

        res.json({message:"Enrolled successfully",updatedClass});

    }catch(e){
        res.status(500),json({message:"Enrolled successfully",updateClass});
    }
};

export default {enrollClass} ;