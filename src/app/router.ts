import HomePage from '@/pages/home/ui/HomePage.vue';
import TestPage from '@/pages/test/ui/TestPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/test', component: TestPage },
  ],
});
