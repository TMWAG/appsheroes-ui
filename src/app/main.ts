import { createApp as createVueApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia } from './store'
import 'normalize.css';
import '@/shared/styles/index.scss';

export function createApp() {
  const app = createVueApp(App)
  app.use(pinia).use(router)
  return { app, router, pinia }
}
