import { ref } from "vue";
import { getTypeFileByMime } from "./getTypeFileByMime";

export const generatePreview = (file: File) => {
  const fileType = getTypeFileByMime(file.type);
  const isImage = ref(false);
  const isVideo = ref(false);
  const isAudio = ref(false);
  const previewUrl = ref('')

  if (fileType === 'image') {
    isImage.value = true;
  } else if (fileType === "video") {
    isVideo.value = true;
  }
  else if (fileType === 'audio') {
    isAudio.value = true
  }
  if (isImage.value || isVideo.value || isAudio.value) {
    previewUrl.value = URL.createObjectURL(file)
  } else {
    previewUrl.value = ""; // No preview available
  }
  const sizeMeasurement = ['б', 'Кб', "Мб", "Гб"]
  let size = file.size
  let index = 0
  while (size > 1024) {
    size = size / 1024
    index++
  }
  return({
    isImage: isImage.value,
    isVideo: isVideo.value,
    isAudio: isAudio.value,
    previewUrl: previewUrl.value,
    fileSize: size.toFixed(2) + sizeMeasurement[index],
  })
};