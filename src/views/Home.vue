<template>
  <main class="main">
    <Forms @alert="alert"/>
    <Alerts :alerts="alerts"/>
    <Entries/>
  </main>
</template>

<script>
import Forms from '@/components/home/Forms.vue';
import Entries from '@/components/home/Entries.vue';
import Alerts from '../components/home/Alerts.vue';

export default {
  name: 'Home',
  components: {
    Forms,
    Entries,
    Alerts,
  },
  data() {
    return {
      alerts: [],
    };
  },
  methods: {
    alert(errors, clear = false) {
      if (clear) this.alerts = [];
      this.alerts = this.alerts.concat(errors);
    },
  },
};
</script>
