<template>
  <div class="alerts">
    <span v-for="alert in alerts" :key="alert">
      {{ alert }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    alerts: {
      type: Array,
    },
  },
};
</script>

<style>

</style>
