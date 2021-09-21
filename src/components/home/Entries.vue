<template>
  <div class="entries">
    <span v-for="entry in s.entries" :key="entry">
      {{ entry.name }} - {{ entry.entries }}
    </span>
  </div>
</template>

<script>
export default {
  inject: ['s'],
};
</script>

<style>

</style>
