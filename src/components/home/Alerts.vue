<template>
  <div class="alerts">
    <Alert @close="close" v-for="(alert, index) in s.alerts" :key="alert" :alert="alert" :index="index"/>
  </div>
</template>

<script>
import Alert from '@/components/home/Alert.vue';

export default {
  inject: ['s'],
  components: {
    Alert,
  },
  methods: {
    close(index) {
      this.s.alerts.splice(index, 1);
    },
  },
};
</script>

<style>

</style>
