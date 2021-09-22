<template>
  <main class="main">
    <Forms @alert="alert"/>
    <Alerts/>
    <Entries/>
  </main>
</template>

<script>
import Forms from '@/components/home/Forms.vue';
import Entries from '@/components/home/Entries.vue';
import Alerts from '../components/home/Alerts.vue';

export default {
  name: 'Home',
  inject: ['s'],
  components: {
    Forms,
    Entries,
    Alerts,
  },
  methods: {
    alert(errors) {
      this.s.alerts = errors;// .map((e) => ({ ...e, show: true }));
    },
  },
};
</script>
