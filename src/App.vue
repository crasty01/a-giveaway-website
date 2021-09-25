<template>
  <Header/>
  <main class="main">
    <router-view/>
  </main>
  <Footer @modeChage="modeChage($event)"/>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  inject: ['supabase', 'h', 's'],
  created() {
    this.modeChage(this.h.darkmode.getInitial());
    this.startWatcher();
  },
  methods: {
    modeChage(darkmode) {
      this.s.settings.darkmode.value = darkmode;
      this.h.darkmode.modeChage();
    },
    startWatcher() {
      this.supabase.auth.onAuthStateChange((event, session) => {
        switch (event) {
          case 'SIGNED_IN':
            this.s.user = this.supabase.auth.user();
            break;
          case 'SIGNED_OUT':
            this.s.user = null;
            break;
          default:
            console.warn('something went wrong', event, session);
        }
      });
    },
  },
};
</script>

<style lang="scss">

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
