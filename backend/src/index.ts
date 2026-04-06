import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/routers";

const port = process.env.port || 3000;
const server = express();

server.use(cors({
  origin: ["http://localhost:5173", "http://192.168.31.143:5173"],
  optionsSuccessStatus: 200
}));

dotenv.config();
server.use('/api', router);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});