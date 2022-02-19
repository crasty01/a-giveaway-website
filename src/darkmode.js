import store from './store/index';

console.log(store);

const mm = window.matchMedia('(prefers-color-scheme: dark)');

console.log(mm.matches);

function watchForDarkmodeChanges(e) {
  console.log(e);

  store.commit('SetDarkMode', e.matches);
}

function UnregisterDarkmodeChanges() {
  mm.removeEventListener('change', watchForDarkmodeChanges);
}

function RegisterDarkmodeChanges() {
  mm.addEventListener('change', watchForDarkmodeChanges);
}

function InitializeVuexDarkmode() {
  const userPrefersDarkmode = localStorage.darkmode;

  if (userPrefersDarkmode) {
    store.commit('SetDarkModeWithUserPrefers', userPrefersDarkmode === 'true');
    return;
  }
  RegisterDarkmodeChanges();
  store.commit('SetDarkMode', mm.matches);
}

export default {
  InitializeVuexDarkmode,
  UnregisterDarkmodeChanges,
  RegisterDarkmodeChanges,
};
