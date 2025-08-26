import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import './assets/themes/green/_theme.scss'

import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.mount('#app')
