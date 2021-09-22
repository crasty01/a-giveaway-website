import { reactive } from 'vue';

const store = reactive({
  user: null,
  entries: {},
  alerts: [],
  settings: {
    darkmode: {
      value: true,
    },
    textOnly: {
      value: false,
    },
    delimiter: {
      value: ' .,',
    },
  },
});

const storePlugin = {
  install: (app) => {
    app.provide('s', store);
  },
};

export { store, storePlugin };
