import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import FilePreview from './FilePreview.vue';

const meta: Meta<typeof FilePreview> = {
  component: FilePreview,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof FilePreview>;
 

export const Image: Story = {
  args: {
    fileInfo: {
      previewUrl: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
      isImage: true,
      isVideo: false,
      isAudio: false,
      fileName: "Sun-Day--1200x834.jpg",
      fileSize: "195.2Гб"
    }
  },
};

export const Video: Story = {
  args: {
    fileInfo: {
      previewUrl: "https://filebump2.services.mobilon.ru/file/XgYPv3t1VT1RxoUVPpWvQuyOkpdSCayNgpv1",
      isImage: false,
      isVideo: true,
      isAudio: false,
      fileName: "video.mp4",
      fileSize: "195.2Гб"
    }
  },
};

export const Audio: Story = {
  args: {
    fileInfo: {
      previewUrl: "https://filebump2.services.mobilon.ru/file/FQZiX5fHxYqdsGK0nOPH7TjHzKmoAU7Hb89r",
      isImage: false,
      isVideo: false,
      isAudio: true,
      fileName: "audio.mp3",
      fileSize: "195.2Гб"
    }
  },
};

export const File: Story = {
  args: {
    fileInfo: {
      previewUrl: "",
      isImage: false,
      isVideo: false,
      isAudio: false,
      fileName: "file.pdf",
      fileSize: "195.2Гб"
    }
  },
};

export const FileLongName: Story = {
  args: {
    fileInfo: {
      previewUrl: "",
      isImage: false,
      isVideo: false,
      isAudio: false,
      fileName: "Требования безопасности к рабочему месту токаря-слесаря 25ого разряда ОАО Инновационные решения 2000-2035.pdf",
      fileSize: "195.2Гб"
    }
  },
};
