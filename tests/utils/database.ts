import connection from "../../src/database";

export async function endConnection() {
  await connection.end();
}

export async function clearDatabase() {
  await connection.query(`TRUNCATE "music_list" RESTART IDENTITY`);
}
