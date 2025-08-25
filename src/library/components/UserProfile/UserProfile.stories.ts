import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import UserProfile from './UserProfile.vue';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof UserProfile>;

const userProfile = {
  name: 'test user',
  userId: 'userId',
  email: 'test@tes.com',
  phone: '+7XXXXXXXX'
};

export const Standard: Story = {
  args: {
    user: userProfile,
  },
};

export const StandardWithAvatar: Story = {
  args: {
    user: {
      ...userProfile,
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=MV',
    },
  },
};
