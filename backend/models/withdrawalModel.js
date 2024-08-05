import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    class:{type:mongoose.Schema.Types.ObjectId, ref:'Class',required:true},
    status:{type:String,enum:['pending','approved','rejected'],required:true},
},{timestamps:true});

const Withdrawal = mongoose.model('Withdrawal',withdrawalSchema);

export default Withdrawal;