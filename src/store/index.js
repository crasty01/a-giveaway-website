import { createStore } from 'vuex';

const entriesKey = 'entries';
const decWinnerKey = 'saveDecrementWinner';
const darkmodeKey = 'darkmode';

function getEntriesFromStorage() {
  const entries = localStorage[entriesKey];
  if (entries) {
    return JSON.parse(entries);
  }
  return [];
}

export default createStore({
  state: () => ({
    entries: getEntriesFromStorage(),
    decrementWinner: localStorage[decWinnerKey] === 'true',
    darkmode: true,
    userPrefersDarkmode: null,
  }),
  mutations: {
    ToggleDecrementWinner(state) {
      state.decrementWinner = !state.decrementWinner;
    },
    IncrementUser(state, { name, delta }) {
      let user = state.entries.find((x) => x.name === name);
      if (!user) {
        user = { name, entries: 0 };
        state.entries.push(user);
      }

      user.entries += delta;

      if (user.entries <= 0) {
        state.entries = state.entries.filter((x) => x.name !== name);
      }
    },
    RemoveUser(state, name) {
      state.entries = state.entries.filter((x) => x.name !== name);
    },
    SetDarkModeWithUserPrefers(state, mode) {
      state.darkmode = mode;
      state.userPrefersDarkmode = state.darkmode;
    },
    SetDarkMode(state, mode) {
      state.darkmode = mode;
    },
    ToggleDarkModeWithUserPrefers(state) {
      state.darkmode = !state.darkmode;
      state.userPrefersDarkmode = state.darkmode;
    },
    PurgeEntries(state) {
      state.entries = [];
    },
  },
  actions: {
    IncrementUser(ctx, payload) {
      ctx.commit('IncrementUser', payload);
    },
    RemoveUser(ctx, user) {
      ctx.commit('RemoveUser', user);
    },
    Save(ctx) {
      localStorage.entries = JSON.stringify(ctx.state.entries);
      localStorage.saveDecrementWinner = ctx.state.decrementWinner;
      if (ctx.state.userPrefersDarkmode !== null) {
        localStorage[darkmodeKey] = ctx.state.userPrefersDarkmode;
      } else {
        delete localStorage[darkmodeKey];
      }
    },

  },
});
