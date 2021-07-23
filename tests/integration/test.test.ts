import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { bodyMusicCreate } from "../factories/musicFactory";
import { clearDatabase, endConnection } from "../utils/database";

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

beforeAll(async () => {
  await clearDatabase();
});

describe("POST /recommendations", () => {
  it("should answer with status 201", async () => {
    const body = bodyMusicCreate();
    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toBe(201);
  });

  it("should answer status 401 if link ins't from youtube", async () => {
    const body = bodyMusicCreate();
    body.youtubeLink =
      "https://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box";
    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toBe(401);
  });

  it("should answer status 409 if exist link song", async () => {
    const body = bodyMusicCreate();
    await connection.query(
      `INSERT INTO music_list (name,"youtubeLink") VALUES ($1,$2)`,
      [body.name, body.youtubeLink]
    );
    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toBe(409);
  });

  it("should answer status 400 for invalid params", async () => {
    const body = bodyMusicCreate();
    body.name = " ";

    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toBe(400);
  });
});
