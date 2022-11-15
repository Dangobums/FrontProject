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
  const loginStaus = JSON.parse(sessionStorage.getItem('isLogin') || '');
  if (to.meta.requiresAuth && loginStaus.isLogin === false) {
    return { name: RouteName.LOGIN };
  }
});

export default router;
