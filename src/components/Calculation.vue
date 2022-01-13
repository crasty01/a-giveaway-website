<template>
  <div class="calculation">
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <span
          class="line"
          :class="{
            essencial: line.essencial,
            winner: line.winner,
            break: line.break,
            loading:
              index >= lines.length - 1 &&
              running &&
              !line.winner &&
              !line.essencial,
          }"
          v-for="(line, index) in lines"
          :key="line"
        >{{ line.message }}</span>
      </div>
    </div>
    <div class="decrement" @click="toggleDecrement">
      remove from winner&nbsp;
      <Icon class="inline">{{decrement ? 'check_box' : 'check_box_outline_blank'}}</Icon>
    </div>
    <div class="buttons">
      <Button text="go back" class="back" @click="goBack" />
      <Button text="reset" icon="refresh" class="rotate" @click="reload" />
    </div>
  </div>
</template>

<script>
import lineTemplate from '@/assets/data/lines.json';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

// import {useStore} from 'vuex';

export default {
  name: 'calculation',
  components: {
    Button,
    Icon,
  },
  emits: ['calcSwitch'],
  props: {
    entries: {
      require: true,
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      lines: [],
      running: false,
    };
  },
  computed: {
    decrement() {
      return this.$store.state.decrementWinner;
    },
  },
  mounted() {
    this.generate(this.random(10, 30), this.lines);
  },
  updated() {
    if (this.lines.length > 50) this.lines.shift();
    this.$scrollToEnd(this.$refs.wrapper);
  },
  methods: {
    async generate(l, array) {
      // const id = (Math.random() + 1).toString(36).substring(7);
      array.push({
        message: 'Sit back and wait for the evaluation to finish',
        essencial: true,
      });
      this.running = false;
      await this.$sleep(1500);
      this.running = true;
      for (let i = 0; i < l; i += 1) {
        if (this.running === false) return;
        const line = this.weightedRandom(lineTemplate);
        array.push({
          ...line,
          message: this.parse(line.template, { name: 'test' }),
          essencial: false,
        });
        // eslint-disable-next-line no-await-in-loop
        await this.$sleep(this.random(200, Math.min(5000 / l, 1000)));
      }
      await this.$sleep(500);
      if (this.running === false) return;
      array.push({
        message: 'And the winner is:',
        essencial: true,
      });
      await this.$sleep(1000);
      if (this.running === false) return;
      array.push({
        message: this.weightedRandom(this.entries, 'entries')?.name,
        essencial: true,
        winner: true,
      });
    },
    random(min = 0, max = 1, floor = true) {
      const r = Math.random() * (max - min) + min;
      if (floor) return Math.floor(r);
      return r;
    },
    parse(line) {
      return line.replace(
        /\${([\w_-]+)}/gi,
        (_, key) => ({
          name: this.randomName(),
        }[key]),
      );
    },
    randomName() {
      return this.entries[this.random(0, this.entries?.length)]?.name;
    },
    weightedRandom(options, weight = 'weight') {
      let w = 0;
      const ws = options.map((e) => {
        w += e[weight];
        return { ...e, weight: w };
      });
      const r = Math.random() * w;
      return ws?.find((e) => e.weight > r);
    },
    decrementWinner() {
      const t = this.lines.at(-1);
      if (t.winner && this.decrement) {
        this.$store.dispatch('IncrementUser', {
          name: t.message,
          delta: -1,
        });
      }
    },
    reload() {
      this.decrementWinner();
      this.lines.push({
        message: '------- new evaluation -------',
        break: true,
      });
      this.generate(this.random(10, 30), this.lines);
    },
    goBack() {
      this.decrementWinner();
      this.$emit('calcSwitch');
    },
    toggleDecrement() {
      this.$store.commit('ToggleDecrementWinner');
    },
  },
};
</script>
