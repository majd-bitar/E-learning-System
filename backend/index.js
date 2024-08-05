import express from "express";
import dotenv from "dotenv";
import dbConnection from "./connection.js";

dotenv.config();

const server = express();
server.listen(process.env.SERVER_PORT,()=>{
    console.log(`server running on port ${process.env.SERVER_PORT}`);
    dbConnection();
});
