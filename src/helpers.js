export default {
  install: (app) => {
    const helpers = {};
    app.provide('h', helpers);
  },
};
