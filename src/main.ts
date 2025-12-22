import './components/2_feed_elements/StickerMessage/utils/suppress-lit-warning';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'

import App from './App.vue';

import './themes/index.scss'
import '@fontsource/inter/700'
import '@fontsource/open-sans/400'
import '@fontsource/open-sans/600'

const pinia = createPinia()

const app = createApp(App);

app.use(pinia)
app.mount('#app');
