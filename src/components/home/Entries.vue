<template>
  <div class="entries list" :class="{ large: entriesLength > 7 }">
  <h2 class="h4 giveaway_title" ><input maxlength="35" type="text" :class="{ wrong: s.giveawayTitle.length < 4 }" v-model="s.giveawayTitle"></h2>
    <ul role="list">
      <Entry v-for="(entry, key) in s.entries" :key="key" :name="key"/>
    </ul>
    <span class="total" v-if="h.entries.getSize(s.entries) > 0">{{ h.entries.getSize(s.entries) }} {{ h.entries.getSize(s.entries) > 1 ? "entries" : "entry" }} in total</span>
  </div>
</template>

<script>
import Entry from '@/components/home/Entry.vue';

export default {
  inject: ['s', 'h'],
  components: {
    Entry,
  },
  computed: {
    entriesLength() {
      return Object.keys(this.s.entries).length;
    },
  },
  created() {
    if (!this.s.giveawayTitle) this.s.giveawayTitle = this.h.others.generateGiveawayTitle();
  },
};
</script>
