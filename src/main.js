import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/scss/all.css';

const app = createApp(App);

app.config.globalProperties.$sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.config.globalProperties.$scrollToEnd = (el, type = 'smooth') => {
  el.scrollTo({
    top: el.scrollHeight,
    left: 0,
    behavior: type,
  });
};

app.mount('#app');
