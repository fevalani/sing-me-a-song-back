import faker from "faker";

export function bodyMusicCreate() {
  const name = faker.name.title();
  const youtubeLink =
    "https://www.youtube.com/watch?v=qfaDUDwIaPE&list=RDqfaDUDwIaPE&start_radio=1&ab_channel=SAMusic";

  const body = { name, youtubeLink };

  return body;
}
