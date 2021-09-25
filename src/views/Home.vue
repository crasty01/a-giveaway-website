<template>
  <main class="main">
    <Forms @alert="alert"/>
    <Alerts/>
    <Entries/>
    <pre>{{ h.supabase.exportData() }}</pre>
  </main>
</template>

<script>
import Forms from '@/components/home/Forms.vue';
import Entries from '@/components/home/Entries.vue';
import Alerts from '../components/home/Alerts.vue';

export default {
  inject: ['s', 'h', 'supabase'],
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
