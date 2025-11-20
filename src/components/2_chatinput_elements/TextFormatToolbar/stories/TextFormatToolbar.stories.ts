import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, provide } from 'vue';

import TextFormatToolbar from '../TextFormatToolbar.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const meta: Meta<typeof TextFormatToolbar> = {
  title: 'Chat Input Elements/TextFormatToolbar',
  component: TextFormatToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // textarea передается через template, поэтому не добавляем в argTypes
  },
  render: (args) => ({
    components: { BaseContainer, TextFormatToolbar, ThemeMode },
    setup() {
      const chatAppId = 'storybook-textformat-toolbar';
      provide('chatAppId', chatAppId);
      const textareaRef = ref<HTMLTextAreaElement | null>(null);
      const text = ref('Выделите этот текст, чтобы увидеть тултип форматирования. Попробуйте выделить разные части текста и применить форматирование.');

      const handleFormatApplied = (data: { format: string; selectedText: string; start: number; end: number; newText: string }) => {
        if (textareaRef.value) {
          textareaRef.value.value = data.newText;
          const newEnd = data.start + (data.newText.length - (text.value.length - (data.end - data.start)));
          textareaRef.value.setSelectionRange(newEnd, newEnd);
          text.value = data.newText;
        }
      };

      return { args, textareaRef, text, handleFormatApplied, chatAppId };
    },
    template: `
      <div :id="chatAppId">
        <BaseContainer style="padding: 24px; width: 100%; max-width: 800px;">
          <div style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
            <ThemeMode :themes="args.theme" :show="true" />
          </div>
          <div style="position: relative; margin: 50px 0;">
            <div style="margin-bottom: 10px; font-size: 14px; color: #666;">
              Выделите текст в поле ниже, чтобы увидеть тултип форматирования
            </div>
            <textarea
              ref="textareaRef"
              v-model="text"
              style="
                width: 100%;
                min-height: 150px;
                padding: 12px;
                border: 1px solid #d0d0d0;
                border-radius: 4px;
                font-family: 'Open Sans', sans-serif;
                font-size: 14px;
                line-height: 1.5;
                resize: vertical;
              "
              placeholder="Введите текст и выделите его для форматирования..."
            />
            <TextFormatToolbar
              :textarea="textareaRef"
              @format-applied="handleFormatApplied"
            />
          </div>
          <div style="margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 4px; font-size: 13px;">
            <strong>Инструкция:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Выделите любой текст в поле выше</li>
              <li>Над выделенным текстом появится тултип с кнопками форматирования</li>
              <li>Нажмите на кнопку форматирования, чтобы применить его</li>
              <li>Поддерживаемые форматы: жирный, курсив, подчёркнутый, зачёркивание, встроенный код, цитата</li>
            </ul>
          </div>
        </BaseContainer>
      </div>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof TextFormatToolbar>;

const themes = [
  { code: 'default', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];

export const Default: Story = {
  args: {
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};

export const WithSampleText: Story = {
  args: {
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  render: (args) => ({
    components: { BaseContainer, TextFormatToolbar, ThemeMode },
    setup() {
      const chatAppId = 'storybook-textformat-toolbar';
      provide('chatAppId', chatAppId);
      const textareaRef = ref<HTMLTextAreaElement | null>(null);
      const text = ref('Это пример текста с **жирным** и *курсивным* форматированием. Выделите текст и попробуйте применить форматирование через тултип.');

      const handleFormatApplied = (data: { format: string; selectedText: string; start: number; end: number; newText: string }) => {
        if (textareaRef.value) {
          textareaRef.value.value = data.newText;
          const newEnd = data.start + (data.newText.length - (text.value.length - (data.end - data.start)));
          textareaRef.value.setSelectionRange(newEnd, newEnd);
          text.value = data.newText;
        }
      };

      return { args, textareaRef, text, handleFormatApplied, chatAppId };
    },
    template: `
      <div :id="chatAppId">
        <BaseContainer style="padding: 24px; width: 100%; max-width: 800px;">
          <div style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
            <ThemeMode :themes="args.theme" :show="true" />
          </div>
          <div style="position: relative; margin: 50px 0;">
            <textarea
              ref="textareaRef"
              v-model="text"
              style="
                width: 100%;
                min-height: 200px;
                padding: 12px;
                border: 1px solid #d0d0d0;
                border-radius: 4px;
                font-family: 'Open Sans', sans-serif;
                font-size: 14px;
                line-height: 1.5;
                resize: vertical;
              "
            />
            <TextFormatToolbar
              :textarea="textareaRef"
              @format-applied="handleFormatApplied"
            />
          </div>
        </BaseContainer>
      </div>
    `
  }),
};

export const MultilineText: Story = {
  args: {
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
  render: (args) => ({
    components: { BaseContainer, TextFormatToolbar, ThemeMode },
    setup() {
      const chatAppId = 'storybook-textformat-toolbar';
      provide('chatAppId', chatAppId);
      const textareaRef = ref<HTMLTextAreaElement | null>(null);
      const text = ref(`Первая строка текста
Вторая строка текста
Третья строка текста

Выделите несколько строк, чтобы увидеть, как тултип позиционируется над выделенным текстом.`);

      const handleFormatApplied = (data: { format: string; selectedText: string; start: number; end: number; newText: string }) => {
        if (textareaRef.value) {
          textareaRef.value.value = data.newText;
          const newEnd = data.start + (data.newText.length - (text.value.length - (data.end - data.start)));
          textareaRef.value.setSelectionRange(newEnd, newEnd);
          text.value = data.newText;
        }
      };

      return { args, textareaRef, text, handleFormatApplied, chatAppId };
    },
    template: `
      <div :id="chatAppId">
        <BaseContainer style="padding: 24px; width: 100%; max-width: 800px;">
          <div style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
            <ThemeMode :themes="args.theme" :show="true" />
          </div>
          <div style="position: relative; margin: 50px 0;">
            <textarea
              ref="textareaRef"
              v-model="text"
              style="
                width: 100%;
                min-height: 250px;
                padding: 12px;
                border: 1px solid #d0d0d0;
                border-radius: 4px;
                font-family: 'Open Sans', sans-serif;
                font-size: 14px;
                line-height: 1.5;
                resize: vertical;
              "
            />
            <TextFormatToolbar
              :textarea="textareaRef"
              @format-applied="handleFormatApplied"
            />
          </div>
        </BaseContainer>
      </div>
    `
  }),
};

