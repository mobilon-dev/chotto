import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FeedLayout from '../FeedLayout.vue';

const meta: Meta<typeof FeedLayout> = {
  title: 'Layouts/FeedLayout',
  component: FeedLayout,
  decorators: [() => ({ template: '<div data-theme="light" style="height: 500px; width: 600px;"><story/></div>' })]
};

export default meta;
type Story = StoryObj<typeof FeedLayout>;

export const Default: Story = {
  render: () => ({
    components: { FeedLayout },
    template: `
      <FeedLayout>
        <div style="background: #f9f9f9; padding: 20px; height: 100%; overflow-y: auto;">
          <h3 style="margin: 0 0 20px 0;">Лента сообщений</h3>
          <div style="margin-bottom: 20px;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 40px; height: 40px; background: #4285f4; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Иван Петров</div>
                  <div style="font-size: 12px; color: #666;">14:30</div>
                </div>
              </div>
              <p style="margin: 0;">Привет! Как дела с проектом? Есть ли какие-то новости?</p>
            </div>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: right;">
              <div style="display: flex; align-items: center; justify-content: flex-end; margin-bottom: 10px;">
                <div>
                  <div style="font-weight: bold;">Вы</div>
                  <div style="font-size: 12px; color: #666;">14:32</div>
                </div>
                <div style="width: 40px; height: 40px; background: #34a853; border-radius: 50%; margin-left: 12px;"></div>
              </div>
              <p style="margin: 0;">Все отлично! Проект почти готов, осталось только протестировать.</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 40px; height: 40px; background: #ea4335; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Мария Сидорова</div>
                  <div style="font-size: 12px; color: #666;">14:35</div>
                </div>
              </div>
              <p style="margin: 0;">Отлично! Когда планируете релиз?</p>
            </div>
          </div>
        </div>
      </FeedLayout>
    `
  })
};

export const WithImages: Story = {
  render: () => ({
    components: { FeedLayout },
    template: `
      <FeedLayout>
        <div style="background: #f9f9f9; padding: 20px; height: 100%; overflow-y: auto;">
          <h3 style="margin: 0 0 20px 0;">Лента с изображениями</h3>
          <div style="margin-bottom: 20px;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 40px; height: 40px; background: #4285f4; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Алексей Козлов</div>
                  <div style="font-size: 12px; color: #666;">14:30</div>
                </div>
              </div>
              <p style="margin: 0 0 10px 0;">Посмотрите на наш новый дизайн!</p>
              <div style="background: #e0e0e0; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                Изображение дизайна
              </div>
            </div>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: right;">
              <div style="display: flex; align-items: center; justify-content: flex-end; margin-bottom: 10px;">
                <div>
                  <div style="font-weight: bold;">Вы</div>
                  <div style="font-size: 12px; color: #666;">14:32</div>
                </div>
                <div style="width: 40px; height: 40px; background: #34a853; border-radius: 50%; margin-left: 12px;"></div>
              </div>
              <p style="margin: 0 0 10px 0;">Отличная работа! Вот мой вариант:</p>
              <div style="background: #c8e6c9; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #2e7d32;">
                Альтернативный дизайн
              </div>
            </div>
          </div>
        </div>
      </FeedLayout>
    `
  })
};

export const WithFiles: Story = {
  render: () => ({
    components: { FeedLayout },
    template: `
      <FeedLayout>
        <div style="background: #f9f9f9; padding: 20px; height: 100%; overflow-y: auto;">
          <h3 style="margin: 0 0 20px 0;">Лента с файлами</h3>
          <div style="margin-bottom: 20px;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 40px; height: 40px; background: #9c27b0; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Елена Волкова</div>
                  <div style="font-size: 12px; color: #666;">14:30</div>
                </div>
              </div>
              <p style="margin: 0 0 10px 0;">Отправляю вам отчет по проекту</p>
              <div style="background: #f5f5f5; padding: 10px; border-radius: 8px; display: flex; align-items: center;">
                <div style="width: 40px; height: 40px; background: #ea4335; border-radius: 8px; margin-right: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                  PDF
                </div>
                <div>
                  <div style="font-weight: bold;">Отчет_по_проекту.pdf</div>
                  <div style="font-size: 12px; color: #666;">2.5 MB</div>
                </div>
              </div>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 40px; height: 40px; background: #ff9800; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Дмитрий Новиков</div>
                  <div style="font-size: 12px; color: #666;">14:35</div>
                </div>
              </div>
              <p style="margin: 0 0 10px 0;">Вот презентация для клиента</p>
              <div style="background: #f5f5f5; padding: 10px; border-radius: 8px; display: flex; align-items: center;">
                <div style="width: 40px; height: 40px; background: #4285f4; border-radius: 8px; margin-right: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                  PPT
                </div>
                <div>
                  <div style="font-weight: bold;">Презентация_клиенту.pptx</div>
                  <div style="font-size: 12px; color: #666;">5.2 MB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FeedLayout>
    `
  })
};

export const EmptyFeed: Story = {
  render: () => ({
    components: { FeedLayout },
    template: `
      <FeedLayout>
        <div style="background: #f9f9f9; padding: 20px; height: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="text-align: center; color: #666;">
            <h3 style="margin: 0 0 15px 0;">Нет сообщений</h3>
            <p style="margin: 0 0 20px 0;">В этом чате пока нет сообщений</p>
            <div style="width: 100px; height: 100px; background: #e0e0e0; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #999;">
              💬
            </div>
          </div>
        </div>
      </FeedLayout>
    `
  })
};
