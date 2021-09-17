import { createApp } from 'vue';
import VueClickAway from 'vue3-click-away';
import App from './App.vue';
import router from './router';
import client from './client';
import store from './store';
import helpers from './helpers';

import './assets/scss/all.css';
import './registerServiceWorker';

const app = createApp(App);

app.use(VueClickAway);
app.use(router);
app.use(store);
app.use(helpers);
app.use(client, {
  url: 'https://jkmkusfedyhgoqehggot.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTQ1Mjg0NSwiZXhwIjoxOTQ3MDI4ODQ1fQ.3UcS2BmI6Ql9fdtbnxGM2Hw8jfOs0yU6MnecYjAuSNM',
});

app.mount('#app');
