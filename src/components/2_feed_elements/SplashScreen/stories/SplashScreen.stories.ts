import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SplashScreen from '../SplashScreen.vue';
import BaseContainer from '../../../5_containers/BaseContainer/BaseContainer.vue';
import ThemeMode from '../../../2_elements/ThemeMode/ThemeMode.vue';

const themes = [
  { code: 'light', name: 'Light', default: true },
  { code: 'dark', name: 'Dark' },
  { code: 'green', name: 'Green' },
  { code: 'mobilon1', name: 'Mobilon1' },
];

const meta: Meta<typeof SplashScreen> = {
  title: 'Feed Elements/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { BaseContainer, ThemeMode, SplashScreen },
    setup() {
      // theme в args используется только сторибуком, не является пропом компонента
      // @ts-expect-error theme контролируется Storybook и пробрасывается через args
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <SplashScreen @action="handleAction">
            <template #title>
              <h3>{{ args.title }}</h3>
            </template>
            <template #text>
              <p>{{ args.text }}</p>
            </template>
            <template #picture>
              <img 
                :src="args.pictureUrl"
                :alt="args.pictureAlt"
                width="200"
                height="200"
              >
            </template>
          </SplashScreen>
        </div>
      </BaseContainer>
    `,
    methods: {
      handleAction() {
        console.log('SplashScreen action triggered');
      }
    }
  }),
};

export default meta;
type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseContainer, ThemeMode, SplashScreen },
    setup() {
      const themesList = (args as { theme?: typeof themes }).theme || themes;
      return { themesList };
    },
    template: `
      <BaseContainer style="padding: 10px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-height: 400px;  display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <SplashScreen>
            <template #title>
              <h3>Привет!</h3>
            </template>
            <template #text>
              <span>Выберите чат и диалог из списка слева</span>
            </template>
            <template #picture>
              <img 
                src="https://filebump2.services.mobilon.ru/file/kUvCq3FDfVXR5UsJ1rB9Z7eFk23Xy3bqyQEZ"
                width="196"
                height="196"
              >
            </template>
          </SplashScreen>
        </div>
      </BaseContainer>
    `,
  }),
};

export const EmptyChat: Story = {
  render: (args) => ({
    components: { BaseContainer, ThemeMode, SplashScreen },
    setup() {
      const themesList = (args as { theme?: typeof themes }).theme || themes;
      return { themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <SplashScreen>
            <template #title>
              <h3>Нет сообщений</h3>
            </template>
            <template #text>
              <span style="max-width: 300px; display: block;">Вы можете отправить новое сообщение или воспользоваться шаблоном</span>
            </template>
            <template #picture>
              <img 
                src="https://filebump2.services.mobilon.ru/file/J2PDOO0mtcsK2v7J3z6tGJ2ttG1IwtlYnHLU/"
                width="196"
                height="196"
              >
            </template>
          </SplashScreen>
        </div>
      </BaseContainer>
    `,
  }),
};

export const NoConnection: Story = {
  render: (args) => ({
    components: { BaseContainer, ThemeMode, SplashScreen },
    setup() {
      const themesList = (args as { theme?: typeof themes }).theme || themes;
      return { themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <SplashScreen>
            <template #title>
              <h3>Нет соединения</h3>
            </template>
            <template #text>
              <p>Проверьте подключение к интернету и попробуйте снова</p>
            </template>
            <template #picture>
              <div style="width: 200px; height: 200px; border-radius: 20px; background: #fdecea; position: relative; color: #ea4335; margin: 30px auto;">
                <span class="pi pi-times-circle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 64px;" />
              </div>
            </template>
          </SplashScreen>
        </div>
      </BaseContainer>
    `,
  }),
};

export const Loading: Story = {
  render: (args) => ({
    components: { BaseContainer, ThemeMode, SplashScreen },
    setup() {
      //@ts-expect-error theme используется только для ThemeMode в доках
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <SplashScreen @action="handleAction">
            <template #title>
              <h3>{{ args.title }}</h3>
            </template>
            <template #text>
              <p>{{ args.text }}</p>
            </template>
            <template #picture>
              <div style="width: 200px; height: 200px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); margin: 20px auto;">
                <span class="pi pi-spinner pi-spin" style="font-size: 48px; color: #4285f4; line-height: 1; display: inline-block;" />
              </div>
            </template>
          </SplashScreen>
        </div>
      </BaseContainer>
    `,
    methods: {
      handleAction() {
        console.log('Loading action triggered');
      }
    },
    mounted() {}
  }),
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    title: 'Загрузка...',
    text: 'Пожалуйста, подождите, данные загружаются',
    pictureUrl: '',
    pictureAlt: '',
  },
};

export const CustomContent: Story = {
  render: (args) => ({
    components: { BaseContainer, ThemeMode, SplashScreen },
    setup() {
      //@ts-expect-error theme используется только для ThemeMode в доках
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <SplashScreen @action="handleAction">
            <template #title>
              <h2 style="color: #9c27b0; margin-bottom: 20px;">{{ args.title }}</h2>
            </template>
            <template #text>
              <div style="text-align: center; max-width: 300px; margin: 0 auto;">
                <p style="margin-bottom: 15px;">{{ args.text }}</p>
                <button style="background: #9c27b0; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                  Узнать больше
                </button>
              </div>
            </template>
            <template #picture>
              <div style="width: 200px; height: 200px; border-radius: 20px; background: var(--chotto-theme-secondary-color, #f5f5f5); position: relative; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 20px auto;">
                <span class="pi pi-gift" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 56px; color: #9c27b0;" />
              </div>
            </template>
          </SplashScreen>
        </div>
      </BaseContainer>
    `,
    methods: {
      handleAction() {
        console.log('Custom content action triggered');
      }
    }
  }),
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    title: 'Специальное предложение',
    text: 'Получите скидку 50% на премиум функции!',
    pictureUrl: 'https://via.placeholder.com/200x200/9c27b0/ffffff?text=Offer',
    pictureAlt: 'Special Offer',
  },
};

export const Minimal: Story = {
  render: (args) => ({
    components: { BaseContainer, ThemeMode, SplashScreen },
    setup() {
      //@ts-expect-error theme используется только для ThemeMode в доках
      const themesList = args.theme || themes;
      return { args, themesList };
    },
    template: `
      <BaseContainer style="padding: 24px; min-height: 80vh; background: var(--chotto-theme-primary-color, #ffffff);">
        <div style="margin-bottom: 20px; padding: 10px; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 4px;">
          <ThemeMode :themes="themesList" :show="true" />
        </div>
        <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--chotto-theme-secondary-color, #f5f5f5); border-radius: 8px;">
          <SplashScreen @action="handleAction">
            <template #title>
              <h4>{{ args.title }}</h4>
            </template>
            <template #text>
              <p>{{ args.text }}</p>
            </template>

          </SplashScreen>
        </div>
      </BaseContainer>
    `,
    methods: {
      handleAction() {
        console.log('Minimal action triggered');
      }
    }
  }),
  args: {
    //@ts-expect-error theme используется только для ThemeMode в доках
    theme: themes,
    title: 'Минималистичный дизайн',
    text: 'Простой и чистый интерфейс',
    pictureUrl: '',
    pictureAlt: '',
  },
};
