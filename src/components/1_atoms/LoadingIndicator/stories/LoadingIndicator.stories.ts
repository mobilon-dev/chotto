import type { Meta, StoryObj } from '@storybook/vue3-vite';

import LoadingIndicator from '../LoadingIndicator.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'default', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Atoms/LoadingIndicator',
  component: LoadingIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Показывать ли индикатор загрузки',
    },
  },
  render: (args) => ({
    components: { LoadingIndicator, BaseContainer, ThemeMode },
    setup() {
      // @ts-expect-error theme используется только для Storybook selector
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 50vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="position: relative; height: 300px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px; border: 1px solid var(--chotto-theme-border-color, #e0e0e0);">
          <LoadingIndicator :is-loading="args.isLoading" />
          <div style="padding: 20px; text-align: center; color: var(--chotto-theme-primary-text-color, #000000);">
            <p>Контент страницы</p>
            <p style="font-size: 14px; color: var(--chotto-theme-secondary-text-color, #666666); margin-top: 10px;">
              Индикатор загрузки отображается поверх этого контента
            </p>
          </div>
        </div>
      </BaseContainer>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  args: {
    isLoading: true,
    // @ts-expect-error theme используется только для Storybook selector
    theme: themes,
  },
};

export const Hidden: Story = {
  args: {
    isLoading: false,
    // @ts-expect-error theme используется только для Storybook selector
    theme: themes,
  },
};

export const InContainer: Story = {
  render: (args) => ({
    components: { LoadingIndicator, BaseContainer, ThemeMode },
    setup() {
      // @ts-expect-error theme используется только для Storybook selector
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="position: relative; width: 100%; max-width: 600px; height: 400px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px; border: 1px solid var(--chotto-theme-border-color, #e0e0e0); margin: 0 auto;">
          <LoadingIndicator :is-loading="args.isLoading" />
          <div style="padding: 40px; text-align: center;">
            <h3 style="color: var(--chotto-theme-primary-text-color, #000000); margin-bottom: 20px;">Загрузка данных</h3>
            <p style="color: var(--chotto-theme-secondary-text-color, #666666);">
              Пожалуйста, подождите...
            </p>
          </div>
        </div>
      </BaseContainer>
    `
  }),
  args: {
    isLoading: true,
    // @ts-expect-error theme используется только для Storybook selector
    theme: themes,
  },
};

export const Overlay: Story = {
  render: (args) => ({
    components: { LoadingIndicator, BaseContainer, ThemeMode },
    setup() {
      // @ts-expect-error theme используется только для Storybook selector
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="position: relative; width: 100%; max-width: 800px; height: 500px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px; border: 1px solid var(--chotto-theme-border-color, #e0e0e0); margin: 0 auto; overflow: hidden;">
          <LoadingIndicator :is-loading="args.isLoading" />
          <div style="padding: 30px;">
            <h2 style="color: var(--chotto-theme-primary-text-color, #000000); margin-bottom: 15px;">Пример контента</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
              <div style="background: var(--chotto-theme-primary-color, #ffffff); padding: 20px; border-radius: 4px; border: 1px solid var(--chotto-theme-border-color, #e0e0e0);">
                <div style="height: 100px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px; margin-bottom: 10px;"></div>
                <p style="color: var(--chotto-theme-primary-text-color, #000000); font-size: 14px;">Элемент 1</p>
              </div>
              <div style="background: var(--chotto-theme-primary-color, #ffffff); padding: 20px; border-radius: 4px; border: 1px solid var(--chotto-theme-border-color, #e0e0e0);">
                <div style="height: 100px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px; margin-bottom: 10px;"></div>
                <p style="color: var(--chotto-theme-primary-text-color, #000000); font-size: 14px;">Элемент 2</p>
              </div>
              <div style="background: var(--chotto-theme-primary-color, #ffffff); padding: 20px; border-radius: 4px; border: 1px solid var(--chotto-theme-border-color, #e0e0e0);">
                <div style="height: 100px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px; margin-bottom: 10px;"></div>
                <p style="color: var(--chotto-theme-primary-text-color, #000000); font-size: 14px;">Элемент 3</p>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    `
  }),
  args: {
    isLoading: true,
    // @ts-expect-error theme используется только для Storybook selector
    theme: themes,
  },
};

