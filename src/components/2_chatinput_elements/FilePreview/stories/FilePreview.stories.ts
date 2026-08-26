import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import FilePreview from '../FilePreview.vue';

const meta: Meta<typeof FilePreview> = {
  title: 'Chat Input Elements/FilePreview',
  component: FilePreview,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof FilePreview>;

export const File: Story = {
  args: {
    fileInfo: {
      previewUrl: "",
      isImage: false,
      isVideo: false,
      isAudio: false,
      fileName: "Catalog.pdf",
      fileSize: "15.2 МБ"
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
      fileSize: "1.2 МБ"
    }
  },
};

export const Image: Story = {
  args: {
    fileInfo: {
      previewUrl: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
      isImage: true,
      isVideo: false,
      isAudio: false,
      fileName: "Доброе утро.png",
      fileSize: "160 КБ"
    }
  },
};

export const Video: Story = {
  args: {
    fileInfo: {
      previewUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      isImage: false,
      isVideo: true,
      isAudio: false,
      fileName: "Цветок.mp4",
      fileSize: "2.1 МБ"
    }
  },
};

export const List: Story = {
  render: () => ({
    components: { FilePreview },
    template: `
      <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #f5f5f5;">
        <span style="white-space: nowrap; color: #5F5F5F; font-size: 14px;">Выбрано 5 из 5</span>
        <div style="display: flex; flex: 1; min-width: 0; gap: 8px;">
          <FilePreview
            v-for="file in files"
            :key="file.fileName"
            :file-info="file"
          />
        </div>
      </div>
    `,
    setup() {
      return {
        files: [
          { isImage: true, isVideo: false, isAudio: false, fileName: 'Доброе утро.png', fileSize: '160 КБ', previewUrl: 'https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg' },
          { isImage: true, isVideo: false, isAudio: false, fileName: 'Кошки с длинными усами.png', fileSize: '2.4 МБ', previewUrl: 'https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg' },
          { isImage: false, isVideo: false, isAudio: false, fileName: 'Catalog.pdf', fileSize: '15.2 МБ', previewUrl: '' },
          { isImage: false, isVideo: false, isAudio: false, fileName: 'Описание проекта.docx', fileSize: '340 КБ', previewUrl: '' },
          { isImage: false, isVideo: false, isAudio: false, fileName: 'Счет №12345.pdf', fileSize: '1.2 МБ', previewUrl: '' },
        ],
      }
    },
  }),
};
