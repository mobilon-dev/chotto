
export const getTypeFileByMime = (mime: string): string => {
  let type: string = 'file';
  if (mime.startsWith("image/")) {
    type = 'image';
  } else if (mime.startsWith("video/")) {
    type = 'video';
  } else if (mime.startsWith("audio/")) {
    type = 'audio';
  }
  return type;
}
