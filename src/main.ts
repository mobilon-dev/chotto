import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue'; // Теперь используем корневой компонент
import './index.scss'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import { definePreset } from '@primevue/themes';

const pinia = createPinia()

const app = createApp(App);

const MyPreset = definePreset(Aura, {

  semantic: {
    primary: {
      0: '{transparent}',
      50: '{neutral.50}',
      100: '{neutral.100}',
      200: '{neutral.200}',
      300: '{neutral.300}',
      400: '{neutral.400}',
      500: '{neutral.500}',
      600: '{neutral.600}',
      700: '{neutral.700}',
      800: '{neutral.800}',
      900: '{neutral.900}',
      950: '{neutral.950}'
    },

    iconSize: '1.3rem',

    colorScheme: {
      light: {
        formField: {
          background: '{primary.100}',
          disabledBackground: '{primary.200}',
          disabledColor: '{primary.500}',
          filledBackground: '{primary.50}',
          filledFocusBackground: '{primary.50}',
          borderColor: '{primary.400}',
          hoverBorderColor: '{primary.500}',
          focusBorderColor: '{primary.700}',
          invalidBorderColor: '{red.400}',
          color: '{primary.700}',
          placeholderColor: '{primary.500}',
          floatLabelColor: '{primary.500}',
          floatLabelFocusColor: '{primary.500}',
          floatLabelInvalidColor: '{red.400}',
          iconColor: '{primary.100}',
        },
      },

      dark: {
        formField: {
          background: '{primary.900}',
          disabledBackground: '{primary.200}',
          disabledColor: '{primary.500}',
          filledBackground: '{primary.50}',
          filledFocusBackground: '{primary.50}',
          borderColor: '{primary.200}',
          hoverBorderColor: '{primary.400}',
          focusBorderColor: '{primary.600}',
          invalidBorderColor: '{red.400}',
          color: '{primary.200}',
          placeholderColor: '{primary.400}',
          floatLabelColor: '{primary.500}',
          floatLabelFocusColor: '{primary.500}',
          floatLabelInvalidColor: '{red.400}',
          iconColor: '{primary.100}',
        },
      }
    }
  },


  components: {
    inputgroup: {
      addonBorderRadius: '0',
      addonBorderColor: '{primary.0}'
    },

    fileupload: {
      headerPadding: '0'
    }

  }
});


app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark',
    }
  }
});
app.mount('#app');
