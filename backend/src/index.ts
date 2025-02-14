// server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import agentRouter from "./routes/agent";
import txRouter from "./routes/tx";


const app = express();
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("The backend is up and running!");
});

app.use("/v1/agent", agentRouter);
app.use("/v1/tx", txRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});