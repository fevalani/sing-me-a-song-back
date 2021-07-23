import faker from "faker";
import connection from "../../src/database";

export function bodyMusicCreate() {
  const name = faker.name.title();
  const youtubeLink =
    "https://www.youtube.com/watch?v=qfaDUDwIaPE&list=RDqfaDUDwIaPE&start_radio=1&ab_channel=SAMusic";

  const body = { name, youtubeLink };

  return body;
}

export async function getMusicId() {
  const song = await connection.query(`SELECT * FROM "music_list"`);
  return song.rows[0].id;
}
