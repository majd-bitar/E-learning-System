import express from "express";
import dotenv from "dotenv";
import dbConnection from "./connection.js";

dotenv.config();

const server = express();
server.listen(process.env.SERVVER_PORT,()=>{dbConnection()});