import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    class:{type:mongoose.Schema.Types.ObjectId, ref:'Class',required:true},
    status:{type:String,enum:['pending','approved','rejected'],required:true},
},{timestamps:true});

// Ensure combination of user and class is unique
withdrawalSchema.index({ user: 1, class: 1 }, { unique: true });

const Withdrawal = mongoose.model('Withdrawal',withdrawalSchema);

export default Withdrawal;