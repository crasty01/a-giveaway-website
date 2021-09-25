import {
  object, number, min, string, size, assert, enums,
} from 'superstruct';
import namez from 'namez';
import { store } from './store';

export default {
  install: (app) => {
    const helpers = {
      others: {
        sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        },
        generateGiveawayTitle() {
          return namez({ format: 'title', separator: ' ' });
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
        fromArray(input, method = 'undef') {
          // console.log('fromArray', input);
          if (input.length <= 0) return { '': {} };
          return (input || []).reduce((o, e) => {
            const n = { ...o };
            if (!n[e.toLowerCase()]) {
              n[e.toLowerCase()] = {
                entries: 0,
                // methods: Object.fromEntries(store.settings.methods.map((m) => [m.code, 0])),
                name: e,
                method,
              };
            }

            n[e.toLowerCase()].entries += 1;
            // console.log('-', n[e.toLowerCase()]);

            return n;
          }, {});
        },
        add(base, toAdd) {
          // console.log('toAdd', toAdd);
          const o = { ...base };
          Object.keys(toAdd).forEach((key) => {
            if (!o[key]) {
              o[key] = {
                entries: 0,
                name: toAdd[key].name,
                methods: Object.fromEntries(store.settings.methods.map((m) => [m.code, 0])),
              };
            }
            o[key].entries += toAdd[key].entries;
            o[key].methods[toAdd[key].method || 'undef'] += toAdd[key].entries;
          });
          return o;
        },
        getSize(obj) {
          let n = 0;
          Object.keys(obj).forEach((key) => {
            n += obj[key].entries;
          });
          return n;
        },
        schema: object({
          name: size(string(), 4, 24),
          entries: min(number(), 1),
          method: enums(store.settings.methods.map((method) => method.code)),
        }),
        validate(input) {
          const keys = Object.keys(input);
          let errors = [];
          keys.forEach((key) => {
            try {
              assert(input[key], helpers.entries.schema);
            } catch (error) {
              errors = errors.concat(error.failures());
            }
          });
          if (errors.length > 0) throw errors;
          return input;
        },
      },
      supabase: {
        exportData() {
          return JSON.stringify(store.entries, null, 2);
        },
      },
    };
    app.provide('h', helpers);
  },
};
