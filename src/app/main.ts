import { createApp as createVueApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia } from './store'

export function createApp() {
  const app = createVueApp(App)
  app.use(pinia).use(router)
  return { app, router, pinia }
}
