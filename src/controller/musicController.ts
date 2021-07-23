import { Request, Response } from "express";
import { bodySchema } from "../schemas/bodySchema";
import { existsSong, validateYouTubeUrl } from "../services/musicListService";

export function musicCreate(req: Request, res: Response) {
  const { name, youtubeLink } = req.body;

  if (!!bodySchema.validate({ name, youtubeLink }).error) {
    res.sendStatus(400);
  }

  if (!validateYouTubeUrl(youtubeLink)) {
    res.sendStatus(401);
  }

  if (existsSong(youtubeLink)) {
    res.sendStatus(409);
  }

  res.sendStatus(201);
}
