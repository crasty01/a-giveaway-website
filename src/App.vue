<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  inject: ['supabase'],
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          this.user = this.supabase.auth.user();
          break;
        case 'SIGNED_OUT':
          this.user = null;
          break;
        default:
          console.warn('something went wrong', event, session);
      }
    });
  },
};
</script>
