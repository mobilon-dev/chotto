import type { Preview } from '@storybook/vue3';
import '../src/themes/index.scss';
import 'primeicons/primeicons.css';

const preview: Preview = {
  parameters: {
    controls: { 
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen'
  },
  tags: ['autodocs']
};

export default preview;
