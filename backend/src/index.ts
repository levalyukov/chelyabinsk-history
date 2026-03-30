import express, { Request, Response } from "express";
import dotenv from "dotenv";

const port = process.env.port || 3000;
const server = express();

dotenv.config();

server.get("/", (req:Request, res:Response) => {
  res.send({"Hello, ": process.env});
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});