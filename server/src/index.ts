import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Connection } from "./database/db";
import Router from "./routes/route";
import AIRouter from "./routes/ai-routes";

const app = express();
dotenv.config;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);
app.use("/ai", AIRouter);
Connection();
app.listen(8000, () => console.log("server is listening on port 8000."));
