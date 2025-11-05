import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FeedSearch from '../FeedSearch.vue';

const meta: Meta<typeof FeedSearch> = {
  title: 'Blocks/FeedSearch',
  component: FeedSearch,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]
};

export default meta;
type Story = StoryObj<typeof FeedSearch>;


export const FeedSearchBasic: Story = {
  args: {

  },
};

export const FeedSearchBasic300px: Story = {
  args: {

  },
  decorators: [() => ({ template: '<div style="max-width: 300px;"><story/></div>' })]
};

export const FeedSearchBasic500px: Story = {
  args: {

  },
  decorators: [() => ({ template: '<div style="max-width: 500px;"><story/></div>' })]
};

