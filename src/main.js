import { createApp } from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import './registerServiceWorker';
import './assets/scss/all.css';
import store from './store';

const app = createApp(App);
app.use(Vuex);
app.use(store);

app.config.globalProperties.$sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.config.globalProperties.$scrollToEnd = (el, type = 'smooth') => {
  el.scrollTo({
    top: el.scrollHeight,
    left: 0,
    behavior: type,
  });
};

app.mount('#app');
