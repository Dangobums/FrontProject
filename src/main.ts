import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from '@/router';
import App from './App.vue';

import 'ant-design-vue/es/style/default.less';
import './assets/styles/app.scss';

localStorage.setItem('user', JSON.stringify({ username: 'long', passwd: '1234' }));

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#__app');
