import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { bodyMusicCreate, getMusicId } from "../factories/musicFactory";
import { clearDatabase, endConnection } from "../utils/database";

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

beforeAll(async () => {
  await clearDatabase();
});

describe("POST /recommendations", () => {
  it("should answer with status 201 if created recommendation", async () => {
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

  it("should answer status 400 for invalid params", async () => {
    const body = bodyMusicCreate();
    body.name = " ";

    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toBe(400);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("should answer status 200 for update music score", async () => {
    const body = bodyMusicCreate();
    await supertest(app).post("/recommendations").send(body);

    const id = await getMusicId();

    const response = await supertest(app)
      .post(`/recommendations/${id}/upvote`)
      .send({});
    expect(response.status).toBe(200);
  });

  it("should answer status 406 for invalid id", async () => {
    const response = await supertest(app)
      .post(`/recommendations/0/upvote`)
      .send({});

    expect(response.status).toBe(406);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("should answer status 200 for update music score", async () => {
    const body = bodyMusicCreate();
    await supertest(app).post("/recommendations").send(body);

    const id = await getMusicId();

    const response = await supertest(app)
      .post(`/recommendations/${id}/downvote`)
      .send({});
    expect(response.status).toBe(200);
  });

  it("should answer status 406 for invalid id", async () => {
    const response = await supertest(app)
      .post(`/recommendations/0/downvote`)
      .send({});

    expect(response.status).toBe(406);
  });
});
