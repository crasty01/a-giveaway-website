<template>
  <li class="item">
    <div class="name">{{ user.name }}
      <span class="note-text" v-if="user.note">{{user.note}}</span></div>
    <div class="entries">
      {{ user.entries }}
      <span class="entries-text">
        {{ user.entries > 1 ? "entries" : "entry" }}
      </span>
    </div>
    <div class="percentage">
      {{ percentage }} %
    </div>
    <div class="actions">
      <Icon
        class="clickable sub"
        @mousedown="start('sub')"
        @mouseleave="stop('sub')"
        @mouseup="stop('sub')"
        @touchstart.passive="start('sub')"
        @touchend="stop('sub')"
        @touchcancel="stop('sub')"
        :class="{ active: interval }"
        :disabled="user.entries > 1"
      >remove_circle_outline</Icon>
      <Icon
        class="clickable add"
        @mousedown="start('add')"
        @mouseleave="stop('add')"
        @mouseup="stop('add')"
        @touchstart.passive="start('add')"
        @touchend="stop('add')"
        @touchcancel="stop('add')"
        :class="{ active: interval }"
      >add_circle_outline</Icon>
      <Icon class="clickable del" @click="del()">delete_outline</Icon>
    </div>
  </li>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'Item',
  components: {
    Icon,
  },
  data() {
    return {
      default_time: 100,
      time: 0,
      interval: false,
      intervals: {
        add: false,
        sub: false,
      },
      test: false,
    };
  },
  computed: {
    percentage() {
      return ((this.user.entries / this.allEntries) * 100).toFixed(1);
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    allEntries: {
      type: Number,
      required: true,
    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    del() {
      this.$store.dispatch('RemoveUser', { name: this.user.name, note: this.user.note });
    },
    sub() {
      this.$store.dispatch('IncrementUser', { name: this.user.name, note: this.user.note, delta: -1 });
    },
    add() {
      this.$store.dispatch('IncrementUser', { name: this.user.name, note: this.user.note, delta: 1 });
    },
    capitalize(s) {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    async start(type) {
      this.intervals[type] = true;
      this[type]();
      await this.$sleep(500);

      if (!this.interval && this.intervals[type]) {
        this.time = this.default_time;
        this[type]();
        this.interval = setInterval(() => {
          this[type]();
          // this.$emit(`item${this.capitalize(type)}`, this.user);
        }, this.time);
      }
    },
    async stop(type) {
      this.intervals[type] = false;
      clearInterval(this.interval);
      this.interval = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
