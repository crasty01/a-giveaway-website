<template>
  <li class="item list-item">
    <div class="name">{{ name }}</div>
    <div class="entries">
      {{ s.entries[name] }}
      <span class="entries-text">
        {{ s.entries[name] > 1 ? "entries" : "entry" }}
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
        :disabled="true/* user.entries > 1*/"
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
  inject: ['h', 's'],
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
  computed: {
    percentage() {
      return ((this.s.entries[this.name] / this.h.entries.getSize(this.s.entries)) * 100).toFixed(1);
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log(this.name);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    del() {
      delete this.s.entries[this.name];
    },
    sub() {
      // remodel
    },
    add() {
      // remodel
    },
    async start() {
      // remodel
      /*
      this.intervals[type] = true;
      this[type]();
      await this.$sleep(500);

      if (!this.interval && this.intervals[type]) {
        this.time = this.default_time;
        this[type]();
        this.interval = setInterval(() => {
          this[type]();
        }, this.time);
      },
      */
    },
    async stop() {
      // remodel
      /*
      this.intervals[type] = false;
      clearInterval(this.interval);
      this.interval = false;
      */
    },
  },
};
</script>
