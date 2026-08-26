import { ref } from "vue";
import { getTypeFileByMime } from "./getTypeFileByMime";
import type { IFilePreview } from '@/types';

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
  const sizeMeasurement = ['Б', 'КБ', 'МБ', 'ГБ']
  let size = file.size
  let index = 0
  while (size >= 1024 && index < sizeMeasurement.length - 1) {
    size = size / 1024
    index++
  }
  const formatted = index === 0
    ? String(Math.round(size))
    : (Math.abs(size - Math.round(size)) < 0.05 ? String(Math.round(size)) : size.toFixed(1))
  return({
    isImage: isImage.value,
    isVideo: isVideo.value,
    isAudio: isAudio.value,
    previewUrl: previewUrl.value,
    fileSize: `${formatted} ${sizeMeasurement[index]}`,
  })
};

export function buildFilePreview(
  name: string | undefined,
  preview: ReturnType<typeof generatePreview> | undefined,
): IFilePreview | undefined {
  if (!preview) return undefined
  return {
    previewUrl: preview.previewUrl,
    isImage: preview.isImage,
    isVideo: preview.isVideo,
    isAudio: preview.isAudio,
    fileName: name,
    fileSize: preview.fileSize,
  }
}
