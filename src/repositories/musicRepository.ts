import connection from "../database";

export async function getSongById(id: number) {
  const song = await connection.query(
    `SELECT * FROM "music_list" WHERE id = $1`,
    [id]
  );
  return song.rows[0];
}

export async function saveMusic(name: string, youtubeLink: string) {
  await connection.query(
    `INSERT INTO "music_list" (name, "youtubeLink") VALUES ($1, $2)`,
    [name, youtubeLink]
  );
  return;
}
