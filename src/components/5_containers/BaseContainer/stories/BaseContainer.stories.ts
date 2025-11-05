import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BaseContainer from '../BaseContainer.vue';

const meta: Meta<typeof BaseContainer> = {
  title: 'Containers/BaseContainer',
  component: BaseContainer,
  decorators: [() => ({ template: '<div data-theme="light" style="height: 400px; width: 600px;"><story/></div>' })]
};

export default meta;
type Story = StoryObj<typeof BaseContainer>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BaseContainer },
    setup() { return { args }; },
    template: `
      <BaseContainer v-bind="args">
        <div style="padding: 20px; background: #f0f0f0; border-radius: 8px;">
          <h3>BaseContainer Content</h3>
          <p>This is the default content inside the BaseContainer.</p>
        </div>
      </BaseContainer>
    `
  })
};

export const CustomSize: Story = {
  args: {
    height: '300px',
    width: '500px'
  },
  render: (args) => ({
    components: { BaseContainer },
    setup() { return { args }; },
    template: `
      <BaseContainer v-bind="args">
        <div style="padding: 20px; background: #e8f4fd; border-radius: 8px; height: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="text-align: center;">
            <h3>Custom Size Container</h3>
            <p>Height: {{ args.height }}</p>
            <p>Width: {{ args.width }}</p>
          </div>
        </div>
      </BaseContainer>
    `
  })
};

export const WithSlot: Story = {
  args: {
    height: '250px',
    width: '400px'
  },
  render: (args) => ({
    components: { BaseContainer },
    setup() { return { args }; },
    template: `
      <BaseContainer v-bind="args">
        <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3>Container with Slot Content</h3>
            <p>This demonstrates how content is rendered inside the BaseContainer slot.</p>
          </div>
          <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px;">
            <small>Footer content in slot</small>
          </div>
        </div>
      </BaseContainer>
    `
  })
};
