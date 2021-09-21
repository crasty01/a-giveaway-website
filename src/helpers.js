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
        parse(input = '') {
          const delimiter = new RegExp(`[${store.settings.delimiter.value}]+`, 'gi');
          return input.trim().replace(delimiter, '$').split('$');
        },
        fromArray(input = []) {
          return input.reduce((o, e) => {
            const n = { ...o };
            if (!n[e]) n[e] = 0;
            n[e] += 1;
            return n;
          }, {});
        },
        add(input) {
          const old = store.entries.find((e) => e.name === input.name);
          if (old) old.entries += input.entries;
          else store.entries.push(input);
        },
      },
    };
    app.provide('h', helpers);
  },
};
