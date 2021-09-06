<template>
  <div class="alerts" v-if="alerts.length > 0">
    <Alert
      v-for="alert in alerts"
      :key="alert.name"
      :alert="alert"
      @hide="$emit('hide', $event)"
    />
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';

export default {
  components: {
    Alert,
  },
  emits: ['hide'],
  props: {
    alerts: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style>
</style>
