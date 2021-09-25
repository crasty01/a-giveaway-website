<template>
  <li class="item list-item entry" ref="root">
    <div class="brief">
      <Icon :title="opened ? 'less information' : 'more information'" class="clickable dropdown" @click="opened = !opened">
        {{ opened ? 'arrow_drop_up' : 'arrow_drop_down' }}
      </Icon>
      <div class="name">{{ s.entries[name].name }}</div>
      <div class="entries">
        {{ s.entries[name].entries }}
        <span class="entries-text">
          {{ s.entries[name].entries > 1 ? "entries" : "entry" }}
        </span>
      </div>
      <span class="percentage">
        {{ percentage }} %
      </span>
      <div class="actions">
        <Icon
          ref="sub"
          class="clickable sub"
          @mousedown="start('sub')"
          @mouseleave="stop('sub')"
          @mouseup="stop('sub')"
          @touchstart.passive="start('sub')"
          @touchend="stop('sub')"
          @touchcancel="stop('sub')"
        >remove_circle_outline</Icon>
        <Icon
          ref="add"
          class="clickable add"
          @mousedown="start('add')"
          @mouseleave="stop('add')"
          @mouseup="stop('add')"
          @touchstart.passive="start('add')"
          @touchend="stop('add')"
          @touchcancel="stop('add')"
        >add_circle_outline</Icon>
        <Icon class="clickable del" @click="del()">delete_outline</Icon>
      </div>
    </div>
      <ul role="list" class="details" ref="details" :class="{ opened }">
        <div class="title">user {{ s.entries[name].name }} has:</div>
        <div class="percentage">{{ percentage }} % chances of winning</div>
        <div class="total">{{ s.entries[name].entries }} out of a total of {{ h.entries.getSize(s.entries) }} {{ h.entries.getSize(s.entries) > 1 ? "entries" : "entry" }}</div>
        <ul class="methods" role="list">
          <li v-for="(value, method) in methods" :key="method">{{ value }} entries {{ methodInfo(method).msg }}</li>
        </ul>
      </ul>
  </li>
</template>

<script>
import smoothReflow from 'vue-smooth-reflow';
import Icon from '@/components/Icon.vue';

export default {
  name: 'Item',
  inject: ['h', 's'],
  mixins: [smoothReflow],
  components: {
    Icon,
  },
  data() {
    return {
      wait: 100,
      pause: 300,
      running: -1,
      opened: false,
    };
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.root,
      property: 'height',
    });
  },
  computed: {
    percentage() {
      return ((this.s.entries[this.name].entries / this.h.entries.getSize(this.s.entries)) * 100).toFixed(1);
    },
    json() {
      return JSON.stringify(this.s.entries[this.name], null, 2);
    },
    methods() {
      return Object.fromEntries(Object.entries(this.s.entries[this.name].methods).filter((e) => e[1] > 0));
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    methodInfo(name) {
      return this.s.settings.methods.find((e) => e.code === name);
    },
    del() {
      delete this.s.entries[this.name];
    },
    sub() {
      const entry = this.s.entries[this.name];
      if (entry.entries > 1) {
        entry.entries -= 1;
        // entry.methods.undefined -= 1;
        const nextMethodAvailable = Object.keys(entry.methods).find((m) => entry.methods[m] > 0);
        // console.log('nextMethodAvailable', nextMethodAvailable);
        // console.log(nextMethodAvailable);
        entry.methods[nextMethodAvailable] -= 1;
      }
      // remodel
    },
    add(method = 'undef') {
      this.s.entries[this.name].entries += 1;
      this.s.entries[this.name].methods[method] += 1;
      // remodel
    },
    async run(type, id) {
      if (id === this.running) this[type]();
      await this.h.others.sleep(this.wait);
      if (id === this.running) return this.run(type, id);
      return false;
    },
    async start(type) {
      this[type]();
      const id = Math.floor(Math.random() * 177000000000); // you would have to have a Dream-luck to get the same id twice and even more than that to get it twice in a row 😉
      this.running = id;
      await this.h.others.sleep(this.pause);
      await this.run(type, id);
    },
    stop() {
      this.running = -1;
    },
  },
};
</script>

<style lang="scss" scoped>
.rollout-enter-active,
.rollout-leave-active {
  transition: height 150ms ease-out;
}

.rollout-enter-from,
.rollout-leave-to {
  height: 0 !important;
}
</style>
