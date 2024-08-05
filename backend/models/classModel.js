import mongoose, { mongo } from "mongoose";

const classSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    files:[{
        filename:String,
        fileUrl:String
    }],
    students:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]},
    {timestamps:true}
);


const Class = mongoose.model('Class',classSchema);
export default Class;