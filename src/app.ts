import express from "express";
import cors from "cors";
import {
  changeMusicScore,
  getRandomMusic,
  musicCreate,
} from "./controller/musicController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", musicCreate);

app.post("/recommendations/:id/upvote", changeMusicScore);

app.post("/recommendations/:id/downvote", changeMusicScore);

app.get("/recommendations/random", getRandomMusic);

app.get("/recommendations/top/:amount");

export default app;
