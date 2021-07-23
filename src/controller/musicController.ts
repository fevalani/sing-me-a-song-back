import { Request, Response } from "express";
import { saveMusic } from "../repositories/musicRepository";
import { bodySchema } from "../schemas/bodySchema";
import { validateYouTubeUrl } from "../services/musicListService";

export async function musicCreate(req: Request, res: Response) {
  const { name, youtubeLink } = req.body;

  if (!!bodySchema.validate({ name, youtubeLink }).error) {
    return res.sendStatus(400);
  }

  if (!validateYouTubeUrl(youtubeLink)) {
    return res.sendStatus(401);
  }

  await saveMusic(name, youtubeLink);
  res.sendStatus(201);
}

export async function changeMusicScore(req: Request, res: Response) {
  console.log(req.params);
  res.sendStatus(200);
}
