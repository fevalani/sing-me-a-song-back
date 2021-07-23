import connection from "../database";

export async function existsSong(youtubeLink: string) {
  const songs = await connection.query(
    `SELECT * FROM "music_list" WHERE "youtubeLink" = $1`,
    [youtubeLink]
  );
  console.log(songs);

  if (songs.rowCount !== 0) {
    return true;
  }
  return false;
}

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
