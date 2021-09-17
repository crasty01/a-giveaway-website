export default {
  install: (app) => {
    const helpers = {
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
        modeChage(darkmode, v) {
          document.documentElement.classList.add('notransitions');
          document.documentElement.classList[darkmode ? 'add' : 'remove']('darkmode');
          localStorage.setItem('darkmode', darkmode);
          document
            .querySelector('meta#themeColor')
            .setAttribute(
              'content',
              darkmode ? 'hsl(240deg 7% 14%)' : 'hsl(0deg 0% 91%)',
            );
          v.$nextTick(() => {
            document.documentElement.classList.remove('notransitions');
          });
        },
      },
    };
    app.provide('h', helpers);
  },
};
