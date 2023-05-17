import { createApp } from 'vue'
import './index.css';
import 'animate.css';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index';
const pinia = createPinia()
const app = createApp(App)


app.use(pinia)
app.use(router)
app.mount('#app')
