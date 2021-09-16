import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import client from './client';

import './registerServiceWorker';

const app = createApp(App);

app.use(router);
app.use(client, {
  url: 'https://jkmkusfedyhgoqehggot.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTQ1Mjg0NSwiZXhwIjoxOTQ3MDI4ODQ1fQ.3UcS2BmI6Ql9fdtbnxGM2Hw8jfOs0yU6MnecYjAuSNM',
});

app.mount('#app');
