import {
  object, number, min, string, size, assert,
} from 'superstruct';
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
        parse(input) {
          const delimiter = new RegExp(`[${store.settings.delimiter.value}]+`, 'gi');
          const res = (input || '').replace(delimiter, ' ').trim().split(' ');
          if (res.length === 1 && res[0] === '') return [];
          return res;
        },
        fromArray(input) {
          return (input || []).reduce((o, e) => {
            const n = { ...o };
            if (!n[e]) n[e] = 0;
            n[e] += 1;
            return n;
          }, {});
        },
        add(base, toAdd) {
          const o = { ...base };
          Object.keys(toAdd).forEach((key) => {
            if (!o[key]) o[key] = 0;
            o[key] += toAdd[key];
          });
          return o;
        },
        getSize(obj) {
          let n = 0;
          Object.keys(obj).forEach((key) => {
            n += obj[key];
          });
          return n;
        },
        schema: object({
          name: size(string(), 4, 24),
          entry: min(number(), 1),
        }),
        validate(input) {
          const data = Object.entries(input);
          let errors = [];
          data.forEach(([name, entry]) => {
            try {
              assert({ name, entry }, helpers.entries.schema);
            } catch (error) {
              errors = errors.concat(error.failures());
            }
          });
          if (errors.length > 0) throw errors;
          return input;
        },
      },
    };
    app.provide('h', helpers);
  },
};
