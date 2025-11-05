import type { Meta, StoryObj } from '@storybook/vue3-vite';
import LinkPreview from '../LinkPreview.vue';

const meta = {
  title: 'Atoms/LinkPreview',
  component: LinkPreview,
  args: {},
} satisfies Meta<typeof LinkPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    linkPreview: {
      title: 'GitHub',
      imageUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      url: 'https://github.com',
      description: 'GitHub is where over 100 million developers shape the future of software'
    }
  },
};
