import type { RouteRecordRaw } from 'vue-router';

import { RouteName } from '@/shared/constants';
import Homepage from '@/modules/homepage/index.vue';
import NotFound from '@/modules/notFound/index.vue';
import Login from '@/modules/login/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NOT_FOUND,
    component: NotFound,
    meta: { layout: 'defaultNoHeader' },
  },
  {
    path: '',
    name: RouteName.HOMEPAGE,
    component: Homepage,
    meta: { layout: 'defaultNoHeader', requiresAuth: true },
  },

  {
    path: '/login',
    name: RouteName.LOGIN,
    component: Login,
    meta: { layout: 'defaultNoHeader' },
  },
  {
    path: 'shop-lives',
    name: RouteName.SHOP_LIVES,
    component: () => import('@/modules/shopProblem/pages/Lives/index.vue'),
    meta: { layout: 'defaultNoHeader', requiresAuth: true },
  },
  {
    path: 'shop-new-registation',
    name: RouteName.NEW_REGISTATION,
    component: () => import('@/modules/shopProblem/pages/NewRegistation/index.vue'),
    meta: { layout: 'defaultNoHeader', requiresAuth: true },
  },
];

export default routes;
