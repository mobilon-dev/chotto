import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FloatContainer from '../FloatContainer.vue';

const meta: Meta<typeof FloatContainer> = {
  title: 'Containers/FloatContainer',
  component: FloatContainer,
  decorators: [() => ({ template: '<div data-theme="light" style="height: 600px; width: 800px; position: relative; background: #f5f5f5;"><story/></div>' })]
};

export default meta;
type Story = StoryObj<typeof FloatContainer>;

export const Default: Story = {
  args: {
    title: 'Floating Window',
    avatar: 'https://via.placeholder.com/40x40/4285f4/ffffff?text=FW',
    height: '300px',
    width: '400px'
  },
  render: (args) => ({
    components: { FloatContainer },
    setup() { return { args }; },
    template: `
      <FloatContainer v-bind="args">
        <div style="padding: 20px; background: white; border-radius: 8px; height: 100%;">
          <h3>FloatContainer Content</h3>
          <p>This is a floating window that can be dragged around.</p>
          <p>Title: {{ args.title }}</p>
          <p>Size: {{ args.width }} x {{ args.height }}</p>
          <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 4px;">
            <small>You can drag this window by clicking and holding the header area.</small>
          </div>
        </div>
      </FloatContainer>
    `
  })
};

export const WithAvatar: Story = {
  args: {
    title: 'Chat Window',
    avatar: 'https://via.placeholder.com/40x40/34a853/ffffff?text=CH',
    height: '350px',
    width: '450px'
  },
  render: (args) => ({
    components: { FloatContainer },
    setup() { return { args }; },
    template: `
      <FloatContainer v-bind="args">
        <div style="padding: 20px; background: white; border-radius: 8px; height: 100%; display: flex; flex-direction: column;">
          <div style="flex: 1;">
            <h3>Chat Interface</h3>
            <div style="height: 200px; background: #f8f9fa; border-radius: 4px; padding: 10px; overflow-y: auto; margin: 10px 0;">
              <div style="margin-bottom: 10px;">
                <strong>User:</strong> Hello there!
              </div>
              <div style="margin-bottom: 10px; text-align: right;">
                <strong>You:</strong> Hi! How can I help you?
              </div>
              <div style="margin-bottom: 10px;">
                <strong>User:</strong> I need some assistance with the product.
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid #e0e0e0; padding-top: 10px;">
            <input type="text" placeholder="Type your message..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          </div>
        </div>
      </FloatContainer>
    `
  })
};

export const SmallSize: Story = {
  args: {
    title: 'Notification',
    avatar: 'https://via.placeholder.com/40x40/ea4335/ffffff?text=!',
    height: '150px',
    width: '300px'
  },
  render: (args) => ({
    components: { FloatContainer },
    setup() { return { args }; },
    template: `
      <FloatContainer v-bind="args">
        <div style="padding: 15px; background: white; border-radius: 8px; height: 100%; display: flex; align-items: center;">
          <div>
            <h4 style="margin: 0 0 10px 0;">New Message</h4>
            <p style="margin: 0; color: #666;">You have received a new message from John Doe.</p>
            <button style="margin-top: 10px; padding: 5px 15px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">
              View Message
            </button>
          </div>
        </div>
      </FloatContainer>
    `
  })
};

export const LargeSize: Story = {
  args: {
    title: 'Dashboard',
    avatar: 'https://via.placeholder.com/40x40/9c27b0/ffffff?text=DB',
    height: '500px',
    width: '600px'
  },
  render: (args) => ({
    components: { FloatContainer },
    setup() { return { args }; },
    template: `
      <FloatContainer v-bind="args">
        <div style="padding: 20px; background: white; border-radius: 8px; height: 100%;">
          <h3>Dashboard Panel</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
            <div style="padding: 15px; background: #f0f8ff; border-radius: 8px;">
              <h4>Statistics</h4>
              <p>Total Users: 1,234</p>
              <p>Active Sessions: 56</p>
            </div>
            <div style="padding: 15px; background: #f0fff0; border-radius: 8px;">
              <h4>Performance</h4>
              <p>Response Time: 120ms</p>
              <p>Uptime: 99.9%</p>
            </div>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #fff8f0; border-radius: 8px;">
            <h4>Recent Activity</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>User login at 14:30</li>
              <li>New order received</li>
              <li>System backup completed</li>
            </ul>
          </div>
        </div>
      </FloatContainer>
    `
  })
};
