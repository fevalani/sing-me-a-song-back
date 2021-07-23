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
