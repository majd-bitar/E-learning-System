import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/connection.js";
import routes from "./routes/routes.js";

dotenv.config();
const server = express();
server.use(express.json());

server.use("/api",routes);

server.get('/test', (req, res) => {
    res.send('Test route is working!');
});

server.listen(process.env.SERVER_PORT,()=>{
    console.log(`server running on port ${process.env.SERVER_PORT}`);
    dbConnection();
});
