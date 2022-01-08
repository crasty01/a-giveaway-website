import { createStore } from 'vuex';

function getEntriesFromStorage() {
  const { entries } = localStorage;
  return JSON.parse(entries);
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
    IncrementUser(state, payload) {
      let user = state.entries.find((x) => x.name === payload.name);
      if (!user) {
        user = { name: payload.name, entries: 0 };
        state.entries.push(user);
      }

      user.entries += payload.delta;

      if (user.entries <= 0) {
        state.entries = state.entries.filter((x) => x.name !== payload.name);
      }
    },
    RemoveUser(state, name) {
      state.entries = state.entries.filter((x) => x.name !== name);
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
