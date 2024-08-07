import Withdrawal from "../models/withdrawalModel.js";
import Class from "../models/classModel.js";



//user requests a withdraw from a course
const userWithdraw = async(req,res)=>{
    try{
        //take the classID from the URL, and the userID sent in the body with the token
        const {classID} = req.params;
        const userID = req.user.id; // extract from token

        const withdrawalRequest = new Withdrawal({
            user:userID,
            class:classID,
            status:'pending',
        });

        await withdrawalRequest.save();
        res.status(201).json({message:'Withdrawal request submitted',withdrawalRequest});
    } catch(e){
        res.status(500).json({message:e.message})
    }
}

//Admin handling the user withdraw request
const handleWithdrawal = async (req,res)=>{
    try{
        //get the withdrawal ID (the one that the admin is currently checking and what status he want it to change to(if he accepted or rejected it))
        const{withdrawalID,status}=req.body;
        const withdrawalRequest = await Withdrawal.findById(withdrawalID);
        if(!withdrawalRequest){
            return res.status(404).json({message:'withdrawal request not found'});
        }

        withdrawalRequest.status=status;
        await withdrawalRequest.save();

        //if the admin approves the withdrawal request, we have to kick the user out of this course
        if(status==='approved'){
            const targetClass = await Class.findById(withdrawalRequest.class);
            if(targetClass){
                //basically here we are creating a new array with all the students which are not related to this reqeuest
                //in other words, we are flitering the student whose request to withdraw was approved to be deleted from the DB aswell
                targetClass.students = targetClass.students.filter(student => student.toString()!== withdrawalRequest.user.toString());
                await targetClass.save();
            }
        }
    }catch(e){
        res.status(500).json({message:e.message});
    }
}


export default {userWithdraw,handleWithdrawal};