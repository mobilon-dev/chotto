import { generatePreview } from './generatePreview';
import { getTypeFileByMime } from './getTypeFileByMime'

export const uploadFile = async ( filebumpUrl: string|null, selectedFile: File ) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    const oldFilebumpUrl = 'https://filebump2.services.mobilon.ru';
    const url = (filebumpUrl ?
      filebumpUrl : oldFilebumpUrl) + "/upload";
  
    try {
      const response = await fetch(
        url,
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
  