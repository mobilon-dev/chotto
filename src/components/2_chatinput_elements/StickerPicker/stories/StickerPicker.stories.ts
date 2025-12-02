import type { Meta, StoryObj } from '@storybook/vue3-vite';

import StickerPicker from '../StickerPicker.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';
import {
  approveSticker,
  callSticker,
  dealSticker,
  docsSticker,
  goodDaySticker,
  helpSticker,
  soonSticker,
  thxSticker,
} from '../../../../apps/data/images/stickers';
import {
  fireDevilSticker,
  fireHiSticker,
  fireLolSticker,
  fireScreamingSticker,
  fireSmokeSticker,
  fireThumbsUpSticker,
  fireTypingSticker,
  fireYesSticker,
} from '../../../../apps/data/images/stickers/animated';

const meta: Meta<typeof StickerPicker> = {
  title: 'Chat Input Elements/StickerPicker',
  component: StickerPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['active', 'disabled'],
      description: 'Состояние кнопки',
    },
    mode: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Режим активации пикера стикеров',
    },
    stickers: {
      control: 'object',
      description: 'Массив стикеров или массив наборов стикеров (вкладок). Поддерживает форматы: [{ url, alt? }, ...], [[{ url, alt? }, ...], ...], или [{ stickers: [...], label?, iconUrl? }, ...]',
    },
    emptyText: {
      control: 'text',
      description: 'Текст при отсутствии стикеров',
    },
  },
  render: (args) => ({
    components: { BaseContainer, StickerPicker, ThemeMode },
    setup() { 
      // Отделяем theme от остальных props для StickerPicker
      // @ts-expect-error - theme не является prop StickerPicker, используется только для ThemeMode
      const { theme, ...stickerPickerProps } = args;
      return { stickerPickerProps, theme }; 
    },
    template: `
      <BaseContainer style="padding: 24px;">
        <div style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
          <ThemeMode :themes="theme" :show="true" />
        </div>
        <div style="position: relative; min-height: 320px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 12px; padding-top: 20px;">
          <StickerPicker v-bind="stickerPickerProps" />
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">Нажмите на кнопку, чтобы открыть панель стикеров</p>
            <p style="margin: 0; color: #666; font-size: 14px;">Зажмите стикер, чтобы увидеть предпросмотр</p>
          </div>
        </div>
      </BaseContainer>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof StickerPicker>;

const themes = [
  { code: 'default', name: 'Light' },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1', default: true }
];

// Реальные стикеры из приложения (с вкладками: статические и анимированные)
const sampleStickers = [
  [
    { url: approveSticker, alt: '✔' },
    { url: callSticker, alt: '📱' },
    { url: dealSticker, alt: '👍' },
    { url: docsSticker, alt: '📄' },
    { url: goodDaySticker, alt: '🙋‍♀️' },
    { url: helpSticker, alt: '🆘' },
    { url: soonSticker, alt: '🔜' },
    { url: thxSticker, alt: '🙏' },
  ],
  [
    { url: fireDevilSticker, alt: '😈' },
    { url: fireHiSticker, alt: '👋' },
    { url: fireLolSticker, alt: '😂' },
    { url: fireScreamingSticker, alt: '😱' },
    { url: fireSmokeSticker, alt: '💨' },
    { url: fireThumbsUpSticker, alt: '👍' },
    { url: fireTypingSticker, alt: '⌨️' },
    { url: fireYesSticker, alt: '✅' },
  ],
];

// Пример с несколькими наборами стикеров (вкладки)
const stickersWithTabs = [
  [
    { url: approveSticker, alt: '✔' },
    { url: callSticker, alt: '📱' },
    { url: dealSticker, alt: '👍' },
    { url: docsSticker, alt: '📄' },
    { url: goodDaySticker, alt: '🙋‍♀️' },
    { url: helpSticker, alt: '🆘' },
    { url: soonSticker, alt: '🔜' },
    { url: thxSticker, alt: '🙏' },
  ],
  [
    { url: fireDevilSticker, alt: '😈' },
    { url: fireHiSticker, alt: '👋' },
    { url: fireLolSticker, alt: '😂' },
    { url: fireScreamingSticker, alt: '😱' },
    { url: fireSmokeSticker, alt: '💨' },
    { url: fireThumbsUpSticker, alt: '👍' },
    { url: fireTypingSticker, alt: '⌨️' },
    { url: fireYesSticker, alt: '✅' },
  ],
  [
    { url: helpSticker, alt: '🆘' },
    { url: soonSticker, alt: '🔜' },
    { url: thxSticker, alt: '🙏' },
  ],
];

export const Default: Story = {
  args: {
    state: 'active',
    mode: 'click',
    stickers: sampleStickers,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const ClickMode: Story = {
  args: {
    state: 'active',
    mode: 'click',
    stickers: sampleStickers,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  decorators: [() => ({ 
    template: '<div style="min-height: 400px; min-width: 200px; padding: 100px 0; position: relative;"><story/></div>' 
  })],
};

export const HoverMode: Story = {
  args: {
    state: 'active',
    mode: 'hover',
    stickers: sampleStickers,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  decorators: [() => ({ 
    template: '<div style="min-height: 400px; min-width: 200px; padding: 100px 0; position: relative;"><story/></div>' 
  })],
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    mode: 'click',
    stickers: sampleStickers,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const Empty: Story = {
  args: {
    state: 'active',
    mode: 'click',
    stickers: [],
    emptyText: 'Нет доступных стикеров',
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const WithTabs: Story = {
  args: {
    state: 'active',
    mode: 'click',
    stickers: stickersWithTabs,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  decorators: [() => ({ 
    template: '<div style="min-height: 400px; min-width: 200px; padding: 100px 0; position: relative;"><story/></div>' 
  })],
};

export const SingleTab: Story = {
  args: {
    state: 'active',
    mode: 'click',
    stickers: sampleStickers,
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  decorators: [() => ({ 
    template: '<div style="min-height: 400px; min-width: 200px; padding: 100px 0; position: relative;"><story/></div>' 
  })],
  parameters: {
    docs: {
      description: {
        story: 'Даже с одним набором стикеров вкладка отображается',
      },
    },
  },
};



