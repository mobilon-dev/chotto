import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import FileUploader from './FileUploader.vue';
import BaseContainer from '../containers/BaseContainer.vue';
import ThemeMode from './ThemeMode.vue';

const meta: Meta<typeof FileUploader> = {
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

const theme = [{
  code: "light",
  name: "Light",
  default: true,
}]

export const Standard: Story = {
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