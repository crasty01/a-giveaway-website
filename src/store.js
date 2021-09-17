import { reactive } from 'vue';

export default {
  install: (app) => {
    const store = reactive({
      user: null,
      darkmode: true,
    });
    app.provide('s', store);
  },
};
