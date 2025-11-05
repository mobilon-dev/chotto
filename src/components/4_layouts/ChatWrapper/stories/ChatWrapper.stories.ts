import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ChatWrapper from '../ChatWrapper.vue';

const meta: Meta<typeof ChatWrapper> = {
  title: 'Layouts/ChatWrapper',
  component: ChatWrapper,
  decorators: [() => ({ template: '<div data-theme="light" style="height: 500px; width: 800px;"><story/></div>' })]
};

export default meta;
type Story = StoryObj<typeof ChatWrapper>;

export const WithSelectedChat: Story = {
  args: {
    isSelectedChat: true,
    isOpenChatPanel: false,
    chatPanelWidth: 50
  },
  render: (args) => ({
    components: { ChatWrapper },
    setup() { return { args }; },
    template: `
      <ChatWrapper v-bind="args">
        <template #default>
          <div style="background: white; padding: 20px; height: 100%; display: flex; flex-direction: column;">
            <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
              <h3 style="margin: 0;">Активный чат</h3>
              <p style="margin: 5px 0 0 0; color: #666;">Пользователь онлайн</p>
            </div>
            <div style="flex: 1; background: #f9f9f9; padding: 15px; border-radius: 8px; overflow-y: auto;">
              <div style="margin-bottom: 15px;">
                <div style="background: white; padding: 10px; border-radius: 8px; max-width: 70%;">
                  <p style="margin: 0;">Привет! Как дела?</p>
                  <small style="color: #999;">14:30</small>
                </div>
              </div>
              <div style="margin-bottom: 15px; text-align: right;">
                <div style="background: #4285f4; color: white; padding: 10px; border-radius: 8px; max-width: 70%; display: inline-block;">
                  <p style="margin: 0;">Отлично! А у тебя?</p>
                  <small style="opacity: 0.8;">14:32</small>
                </div>
              </div>
            </div>
            <div style="margin-top: 15px;">
              <input type="text" placeholder="Введите сообщение..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
          </div>
        </template>
      </ChatWrapper>
    `
  })
};

export const WithPlaceholder: Story = {
  args: {
    isSelectedChat: false,
    isOpenChatPanel: false,
    chatPanelWidth: 50
  },
  render: (args) => ({
    components: { ChatWrapper },
    setup() { return { args }; },
    template: `
      <ChatWrapper v-bind="args">
        <template #placeholder>
          <div style="text-align: center; color: #666;">
            <h3>Выберите чат</h3>
            <p>Выберите чат из списка слева, чтобы начать общение</p>
            <div style="margin-top: 20px;">
              <img src="https://via.placeholder.com/150x150/e0e0e0/999999?text=Chat" alt="Chat Icon" style="border-radius: 50%;">
            </div>
          </div>
        </template>
      </ChatWrapper>
    `
  })
};

export const WithChatPanel: Story = {
  args: {
    isSelectedChat: true,
    isOpenChatPanel: true,
    chatPanelWidth: 40
  },
  render: (args) => ({
    components: { ChatWrapper },
    setup() { return { args }; },
    template: `
      <ChatWrapper v-bind="args">
        <template #default>
          <div style="background: white; padding: 20px; height: 100%; display: flex; flex-direction: column;">
            <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
              <h3 style="margin: 0;">Чат с панелью</h3>
              <p style="margin: 5px 0 0 0; color: #666;">Панель информации открыта</p>
            </div>
            <div style="flex: 1; background: #f9f9f9; padding: 15px; border-radius: 8px; overflow-y: auto;">
              <div style="margin-bottom: 15px;">
                <div style="background: white; padding: 10px; border-radius: 8px; max-width: 60%;">
                  <p style="margin: 0;">Сообщение в чате с открытой панелью</p>
                  <small style="color: #999;">14:30</small>
                </div>
              </div>
            </div>
            <div style="margin-top: 15px;">
              <input type="text" placeholder="Введите сообщение..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
          </div>
        </template>
        <template #chatpanel>
          <div style="background: #f5f5f5; padding: 15px; height: 100%; border-left: 1px solid #ddd;">
            <h4 style="margin: 0 0 15px 0;">Информация о чате</h4>
            <div style="background: white; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
              <h5 style="margin: 0 0 10px 0;">Участники</h5>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 30px; height: 30px; background: #4285f4; border-radius: 50%; margin-right: 10px;"></div>
                <span>Иван Петров</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 30px; height: 30px; background: #34a853; border-radius: 50%; margin-right: 10px;"></div>
                <span>Вы</span>
              </div>
            </div>
            <div style="background: white; padding: 10px; border-radius: 8px;">
              <h5 style="margin: 0 0 10px 0;">Настройки</h5>
              <button style="width: 100%; padding: 8px; background: #ea4335; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Покинуть чат
              </button>
            </div>
          </div>
        </template>
      </ChatWrapper>
    `
  })
};

export const WideChatPanel: Story = {
  args: {
    isSelectedChat: true,
    isOpenChatPanel: true,
    chatPanelWidth: 60
  },
  render: (args) => ({
    components: { ChatWrapper },
    setup() { return { args }; },
    template: `
      <ChatWrapper v-bind="args">
        <template #default>
          <div style="background: white; padding: 20px; height: 100%; display: flex; flex-direction: column;">
            <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
              <h3 style="margin: 0;">Чат с широкой панелью</h3>
              <p style="margin: 5px 0 0 0; color: #666;">Панель занимает 60% ширины</p>
            </div>
            <div style="flex: 1; background: #f9f9f9; padding: 15px; border-radius: 8px; overflow-y: auto;">
              <div style="margin-bottom: 15px;">
                <div style="background: white; padding: 10px; border-radius: 8px; max-width: 50%;">
                  <p style="margin: 0;">Сообщение в чате с широкой панелью</p>
                  <small style="color: #999;">14:30</small>
                </div>
              </div>
            </div>
            <div style="margin-top: 15px;">
              <input type="text" placeholder="Введите сообщение..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
          </div>
        </template>
        <template #chatpanel>
          <div style="background: #f0f8ff; padding: 20px; height: 100%; border-left: 1px solid #ddd;">
            <h4 style="margin: 0 0 20px 0;">Расширенная панель</h4>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h5 style="margin: 0 0 15px 0;">Участники чата</h5>
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; background: #4285f4; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Иван Петров</div>
                  <div style="font-size: 12px; color: #666;">Онлайн</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; background: #34a853; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Вы</div>
                  <div style="font-size: 12px; color: #666;">Онлайн</div>
                </div>
              </div>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h5 style="margin: 0 0 15px 0;">Файлы чата</h5>
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 30px; height: 30px; background: #ea4335; border-radius: 4px; margin-right: 10px;"></div>
                <div>
                  <div style="font-size: 14px;">document.pdf</div>
                  <div style="font-size: 12px; color: #666;">2.5 MB</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 30px; height: 30px; background: #34a853; border-radius: 4px; margin-right: 10px;"></div>
                <div>
                  <div style="font-size: 14px;">image.jpg</div>
                  <div style="font-size: 12px; color: #666;">1.2 MB</div>
                </div>
              </div>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px;">
              <h5 style="margin: 0 0 15px 0;">Действия</h5>
              <button style="width: 100%; padding: 10px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">
                Поделиться контактом
              </button>
              <button style="width: 100%; padding: 10px; background: #ea4335; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Покинуть чат
              </button>
            </div>
          </div>
        </template>
      </ChatWrapper>
    `
  })
};
