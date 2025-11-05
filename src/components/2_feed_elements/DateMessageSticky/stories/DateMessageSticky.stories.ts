import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, onMounted, onUnmounted } from 'vue';

import DateMessageSticky from '../DateMessageSticky.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const meta: Meta<typeof DateMessageSticky> = {
  title: 'Feed Elements/DateMessageSticky',
  component: DateMessageSticky,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст даты для отображения',
    },
  },
  render: (args) => ({
    components: { BaseContainer, DateMessageSticky, ThemeMode },
    setup() { 
      const showStickyDate = ref(false);
      const stickyDateText = ref(args.text || 'Сегодня');
      const scrollContainer = ref<HTMLElement | null>(null);
      let hideTimer: number | null = null;
      const autoHideDelay = 500;

      // Генерируем даты для разных сообщений (с timestamp как в оригинале)
      const messages = Array.from({ length: 40 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(i / 5)); // Каждые 5 сообщений - новый день
        const timestamp = Math.floor(date.getTime() / 1000); // Unix timestamp в секундах
        return {
          id: i + 1,
          timestamp: timestamp,
          date: date,
          dateText: i === 0 ? 'Сегодня' : 
                   i === 5 ? 'Вчера' : 
                   i < 15 ? date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) :
                   date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        };
      });

      // Соответствует логике useStickyDate.ts
      const updateStickyDate = () => {
        if (!scrollContainer.value) return;

        const feedEl = scrollContainer.value as HTMLElement;
        const feedTop = feedEl.getBoundingClientRect().top;
        let topMost: HTMLElement | null = null;

        // Находим первое сообщение, которое пересекает верхнюю границу feed
        const messageElements = feedEl.querySelectorAll('[data-message-id]');
        for (const el of messageElements) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= feedTop + 1 && rect.bottom > feedTop) {
            topMost = el as HTMLElement;
            break;
          }
        }

        // Если не нашли пересекающее, берем первое видимое сверху
        if (!topMost) {
          for (const el of messageElements) {
            const rect = el.getBoundingClientRect();
            if (rect.top >= feedTop) {
              topMost = el as HTMLElement;
              break;
            }
          }
        }

        if (!topMost) return;

        // Получаем timestamp из сообщения (как в оригинале через id)
        const messageId = topMost.getAttribute('data-message-id');
        if (messageId) {
          const msg = messages.find(m => m.id.toString() === messageId);
          if (msg) {
            const d = new Date(msg.timestamp * 1000);
            stickyDateText.value = d.toLocaleDateString('ru-RU');
          }
        }
      };

      // Соответствует методу show() из useStickyDate.ts
      const show = () => {
        updateStickyDate();
        showStickyDate.value = true;
        
        if (hideTimer) {
          window.clearTimeout(hideTimer);
        }
        
        hideTimer = window.setTimeout(() => {
          showStickyDate.value = false;
        }, autoHideDelay);
      };

      const handleScroll = () => {
        show(); // Вызываем show() при скролле, как в оригинале
      };

      onMounted(() => {
        if (scrollContainer.value) {
          scrollContainer.value.addEventListener('scroll', handleScroll, { passive: true });
          // Инициализируем дату при монтировании
          updateStickyDate();
        }
      });

      onUnmounted(() => {
        if (scrollContainer.value) {
          scrollContainer.value.removeEventListener('scroll', handleScroll);
        }
        if (hideTimer) {
          window.clearTimeout(hideTimer);
        }
      });

      return { args, showStickyDate, stickyDateText, scrollContainer, messages }; 
    },
    template: `
      <BaseContainer style="min-height: 100vh; background: var(--chotto-theme-primary-color, #ffffff); padding: 24px;">
        <style>
          .fade-enter-active, .fade-leave-active {
            transition: opacity 0.3s ease;
          }
          .fade-enter-from, .fade-leave-to {
            opacity: 0;
          }
        </style>
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="args.theme" :show="true" />
        </div>
        <div style="max-width: 600px; margin: 0 auto;">
          <div 
            ref="scrollContainer"
            style="background: var(--chotto-theme-primary-color, #ffffff); border: 1px solid var(--chotto-theme-border, #e5e5e5); border-radius: 8px; overflow: hidden; height: 500px; overflow-y: auto; position: relative;"
          >
            <transition name="fade">
              <div v-if="showStickyDate" style="position: sticky; top: 10px; z-index: 200; display: flex; justify-content: center; pointer-events: none; padding: 10px;">
                <DateMessageSticky :text="stickyDateText" />
              </div>
            </transition>
            
            <!-- Контент для скролла -->
            <div style="padding: 20px;">
              <p style="margin-bottom: 20px; color: var(--chotto-theme-primary-text-color, #1E1E1E);">
                Прокрутите контейнер вверх или вниз - DateMessageSticky появится во время скролла и будет показывать дату видимого сообщения. Автоматически скроется через 0.5 секунды после остановки.
              </p>
              <div 
                v-for="msg in messages" 
                :key="'message-' + msg.id"
                :data-message-id="msg.id"
                style="padding: 15px; margin-bottom: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;"
              >
                <p style="color: var(--chotto-theme-secondary-text-color, #5F5F5F); margin: 0 0 5px 0; font-size: 11px; font-weight: 600;">
                  {{ msg.dateText }}
                </p>
                <p style="color: var(--chotto-theme-primary-text-color, #1E1E1E); margin: 0;">Сообщение {{ msg.id }}</p>
                <p style="color: var(--chotto-theme-secondary-text-color, #5F5F5F); margin: 5px 0 0 0; font-size: 12px;">
                  Это сообщение для демонстрации скролла. Прокрутите контейнер, чтобы увидеть, как меняется дата в DateMessageSticky.
                </p>
              </div>
            </div>
          </div>
          <p style="margin-top: 20px; padding: 15px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px; color: var(--chotto-theme-primary-text-color, #1E1E1E); font-size: 14px;">
            💡 Совет: Прокрутите контейнер - DateMessageSticky появится только во время скролла и будет показывать дату видимого сообщения. При скролле дата будет автоматически обновляться. Компонент скроется через 0.5 секунды после остановки скролла.
          </p>
        </div>
      </BaseContainer>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof DateMessageSticky>;

const themes = [
  { code: 'default', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' }
];

export const Today: Story = {
  args: {
    text: 'Сегодня',
    //@ts-expect-error - theme prop is only for Storybook selector
    theme: themes,
  },
};
