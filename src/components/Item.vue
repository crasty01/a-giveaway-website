<template>
  <li class="item">
    <div class="name">
      {{ user.name }}
    </div>
    <div class="entries">
      {{ user.entries }} {{ user.entries > 1 ? "entries" : "entry" }}
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
        >remove_circle_outline</Icon
      >
      <Icon
        class="clickable add"
        @mousedown="start('add')"
        @mouseleave="stop('add')"
        @mouseup="stop('add')"
        @touchstart.passive="start('add')"
        @touchend="stop('add')"
        @touchcancel="stop('add')"
        :class="{ active: interval }"
        >add_circle_outline</Icon
      >
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
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    del() {
      this.$emit('itemDel', this.user.name);
    },
    sub() {
      this.$emit('itemSub', this.user.name);
    },
    add() {
      this.$emit('itemAdd', this.user.name);
    },
    capitalize(s) {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    start(type) {
      if (!this.interval) {
        this.time = this.default_time;
        this[type]();
        this.interval = setInterval(() => {
          this[type]();
          // this.$emit(`item${this.capitalize(type)}`, this.user);
        }, this.time);
      }
    },
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
