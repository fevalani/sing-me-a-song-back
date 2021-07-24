import faker from "faker";
import connection from "../../src/database";

export function bodyMusicCreate() {
  const name = faker.name.title();
  const youtubeLink =
    "https://www.youtube.com/watch?v=qfaDUDwIaPE&list=RDqfaDUDwIaPE&start_radio=1&ab_channel=SAMusic";

  const body = { name, youtubeLink };

  return body;
}

export async function bodyMusicInsert(num: number) {
  for (let i = 0; i < num; i++) {
    const { name, youtubeLink } = bodyMusicCreate();
    await connection.query(
      `INSERT INTO "music_list" (name, "youtubeLink") VALUES ($1, $2);`,
      [name, youtubeLink]
    );
    console.log(name, youtubeLink);
    console.log(await connection.query('SELECT * FROM "music_list"'));
  }
}

export async function getMusicId() {
  const song = await connection.query(`SELECT * FROM "music_list"`);
  return song.rows[0].id;
}
