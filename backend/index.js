import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/connection.js";
import routes from "./routes/routes.js";
import cors from 'cors';

dotenv.config();
const server = express();
server.use(express.json());

server.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  }));
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

server.options('*', cors()); // Allow preflight requests for all routes

server.use("/api",routes);

server.get('/test', (req, res) => {
    res.send('Test route is working!');
});

server.listen(process.env.SERVER_PORT,()=>{
    console.log(`server running on port ${process.env.SERVER_PORT}`);
    dbConnection();
});
