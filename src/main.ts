import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'

import App from './App.vue'

import './assets/style.scss'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.mount('#app')
