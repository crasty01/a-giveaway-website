<template>
  <Header/>
  <router-view/>
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
    this.s.darkmode = this.h.darkmode.getInitial();
    this.h.darkmode.modeChage(this.s.darkmode, this);
  },
  mounted() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          this.s.user = this.supabase.auth.user();
          console.log('SIGNED_IN');
          // this.$nextTick(() => console.log(this.s.user));
          break;
        case 'SIGNED_OUT':
          this.s.user = null;
          console.log('SIGNED_OUT');
          break;
        default:
          console.warn('something went wrong', event, session);
      }
    });
  },
  methods: {
    modeChage(darkmode) {
      this.s.darkmode = darkmode;
      this.h.darkmode.modeChage(darkmode, this);
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
