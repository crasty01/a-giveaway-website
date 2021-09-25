import { reactive } from 'vue';

const store = reactive({
  user: null,
  entries: {},
  giveawayTitle: undefined,
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
    methods: [
      {
        code: 'undef',
        name: 'undefined',
        desc: 'no method was defined',
        msg: 'from an undefined source',
      },
      {
        code: 'bit',
        name: 'bits',
        desc: 'for every 500 donated bits',
        msg: 'from donating bits',
      },
      {
        code: 'sub',
        name: 'gifted sub',
        desc: 'for every 1 gifted subscription',
        msg: 'from gifting subscription',
      },
      {
        code: 'dono',
        name: 'donation',
        desc: 'for every 5 dolars donated',
        msg: 'from donating money',
      },
    ],
  },
});

const storePlugin = {
  install: (app) => {
    app.provide('s', store);
  },
};

export { store, storePlugin };
