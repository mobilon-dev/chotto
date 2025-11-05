import './utils/suppress-lit-warning';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'

import App from './App.vue';

import './themes/index.scss'

const pinia = createPinia()

const app = createApp(App);

app.use(pinia)
app.mount('#app');
