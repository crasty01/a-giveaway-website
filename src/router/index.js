import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store';
import Home from '../views/Home.vue';

const checkAuth = (to, from, next) => {
  if (store.user) next();
  else next(from.path || '/');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('@/views/Guide.vue'),
  },
  {
    path: '/giveaways',
    name: 'Giveaways',
    component: () => import('@/views/Giveaways.vue'),
    beforeEnter: [checkAuth],
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
