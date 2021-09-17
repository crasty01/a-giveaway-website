import { reactive } from 'vue';

const store = reactive({
  user: null,
  entries: {},
  settings: {
    darkmode: {
      value: true,
    },
  },
});

const storePlugin = {
  install: (app) => {
    app.provide('s', store);
  },
};

export { store, storePlugin };
