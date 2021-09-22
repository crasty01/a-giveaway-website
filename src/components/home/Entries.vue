<template>
  <div class="entries list ">
    <ul role="list">
      <Entry v-for="(entry, key) in s.entries" :key="entry" :name="key"/>
    </ul>
  </div>
</template>

<script>
import Entry from '@/components/home/Entry.vue';

export default {
  inject: ['s'],
  components: {
    Entry,
  },
};
</script>

<style>

</style>
