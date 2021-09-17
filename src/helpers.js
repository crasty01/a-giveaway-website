import { store } from './store';

export default {
  install: (app) => {
    const helpers = {
      others: {
        sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        },
      },
      darkmode: {
        getInitial() {
          if (localStorage.darkmode === undefined) {
            const res = window.matchMedia(
              '(prefers-color-scheme: dark)',
            ).matches;
            return res;
          }
          return localStorage.darkmode === 'true';
        },
        async modeChage() {
          document.documentElement.classList.add('notransitions');
          document.documentElement.classList[store.settings.darkmode.value ? 'add' : 'remove']('darkmode');
          localStorage.setItem('darkmode', store.settings.darkmode.value);
          document
            .querySelector('meta#themeColor')
            .setAttribute(
              'content',
              store.settings.darkmode.value ? 'hsl(240deg 7% 14%)' : 'hsl(0deg 0% 91%)',
            );
          await helpers.others.sleep(2);
          document.documentElement.classList.remove('notransitions');
        },
      },
      entries: {
        parse(a) {
          console.log(a);
          return a;
        },
        add(a) {
          console.log(a);
          return a;
        },
      },
    };
    app.provide('h', helpers);
  },
};
