import { createRouter, createWebHistory } from 'vue-router';
import { RouteName } from '@/shared/constants';

import routes from './routes';
import MainLayout from '@/shared/layout/MainLayout/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: MainLayout,
      children: routes,
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !sessionStorage.getItem('username')) {
    return { name: RouteName.LOGIN };
  }
});

export default router;
