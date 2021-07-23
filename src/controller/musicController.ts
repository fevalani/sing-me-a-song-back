import { Request, Response } from "express";
import { getSongById, saveMusic } from "../repositories/musicRepository";
import { bodySchema } from "../schemas/bodySchema";
import {
  downVoteLogic,
  upVoteLogic,
  validateYouTubeUrl,
} from "../services/musicListService";

export async function musicCreate(req: Request, res: Response) {
  try {
    const { name, youtubeLink } = req.body;

    if (!!bodySchema.validate({ name, youtubeLink }).error) {
      return res.sendStatus(400);
    }

    if (!validateYouTubeUrl(youtubeLink)) {
      return res.sendStatus(401);
    }

    await saveMusic(name, youtubeLink);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function changeMusicScore(req: Request, res: Response) {
  const id = Number(req.params.id);
  const song = await getSongById(id);

  if (!song) {
    return res.sendStatus(406);
  }
  const { score } = song;

  if (req.path.includes("downvote")) {
    await downVoteLogic(id, score);
    return res.sendStatus(200);
  } else {
    await upVoteLogic(id, score);
    return res.sendStatus(200);
  }
}
