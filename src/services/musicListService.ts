import {
  deleteMusicById,
  updateMusicScore,
} from "../repositories/musicRepository";

export function validateYouTubeUrl(youtubeLink: string) {
  if (youtubeLink) {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (youtubeLink.match(regExp)) {
      return true;
    }
  }
  return false;
}

export async function downVoteLogic(id: number, score: number) {
  const newScore = score - 1;
  if (newScore === -5) {
    await deleteMusicById(id);
  } else {
    await updateMusicScore(id, newScore);
  }
  return;
}

export async function upVoteLogic(id: number, score: number) {
  const newScore = score + 1;
  await updateMusicScore(id, newScore);
  return;
}
