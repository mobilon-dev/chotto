import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { provide } from 'vue';
 
import FileUploader from '../FileUploader.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import { chottoUploadFileKey, type ChottoUploadFileFn } from '@/hooks';

const mockUploader: ChottoUploadFileFn = async (file) => {
  const filename = file instanceof File ? file.name : 'blob';
  return {
    url: URL.createObjectURL(file),
    filename,
  };
};

const theme = [{
  code: "light",
  name: "Light",
  default: true,
}]

const meta: Meta<typeof FileUploader> = {
  title: 'Chat Input Elements/FileUploader',
  component: FileUploader,
  render: (args) => ({
    components: {BaseContainer, FileUploader, ThemeMode},
    setup() {return {args}},
    template: `
      <BaseContainer>
        <ThemeMode :themes="args.theme" />
        <FileUploader v-bind=args />
      </BaseContainer>
    ` 
   }),
  decorators: [() => ({ template: '<div data-theme="light" style="margin-top: 120px;"><story/></div>' })]
};
 
export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Standard: Story = {
  args: {
    filebumpUrl: 'https://filebump2.services.mobilon.ru',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const CustomUploader: Story = {
  args: {
    uploader: mockUploader,
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const InjectedUploader: Story = {
  render: (args) => ({
    components: {BaseContainer, FileUploader, ThemeMode},
    setup() {
      provide(chottoUploadFileKey, mockUploader)
      return {args}
    },
    template: `
      <BaseContainer>
        <ThemeMode :themes="args.theme" />
        <FileUploader />
      </BaseContainer>
    `
  }),
  args: {
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};

export const InactiveButton: Story = {
  args: {
    state: 'disabled',
    //@ts-expect-error - theme prop type mismatch in storybook
    theme
  },
};