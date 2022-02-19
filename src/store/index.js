import { createStore } from 'vuex';

function getEntriesFromStorage() {
  const { entries } = localStorage;
  if (entries) {
    return JSON.parse(entries);
  }
  return [];
}

export default createStore({
  state: () => ({
    entries: getEntriesFromStorage(),
    decrementWinner: localStorage.saveDecrementWinner === 'true',
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
    },
  },
});
