import express from "express";
import cors from "cors";
import { musicCreate } from "./controller/musicController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", musicCreate);

app.post("/recommendations/:id/upvote");

app.post("/recommendations/:id/downvote");

export default app;
