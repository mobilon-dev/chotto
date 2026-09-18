import { generatePreview } from './generatePreview';
import { getTypeFileByMime } from './getTypeFileByMime'

export type UploadFileResult =
  | {
      url: string
      name: string
      size: number
      type: string
      status: 'success'
      preview: ReturnType<typeof generatePreview>
    }
  | { status: 'error' }

/**
 * @deprecated Legacy filebump adapter (`POST {filebumpUrl}/upload`).
 * Предпочтительный путь — `ChottoUploadFileFn` через prop `uploader` или `provide(chottoUploadFileKey)`.
 * Будет удалён в следующем major.
 */
export const uploadFile = async ( filebumpUrl: string, selectedFile: File ): Promise<UploadFileResult> => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        filebumpUrl + "/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      // emit event with link
      return({
        url: result.url,
        name: selectedFile.name,
        size: selectedFile.size,
        type: getTypeFileByMime(selectedFile.type),
        status: 'success',
        preview: generatePreview(selectedFile),
      })
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
      return({status: 'error'})
    }
  };
  