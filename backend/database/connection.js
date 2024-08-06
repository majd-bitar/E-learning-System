import mongoose from "mongoose";

const dbConnection = async()=>{
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected to DB")
}

export default dbConnection;