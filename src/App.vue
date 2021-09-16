<template>
  <header class="header">
    <h1 class="h2">A giveaway website</h1>
  </header>
  <transition name="fade">
    <main class="main" v-if="!calculating">
      <h2 class="h3">participants:</h2>
      <div class="main-grid">
        <section class="list" :class="{ large: entries.length > 7 }">
          <ul role="list" ref="list">
            <Item
              v-for="item in entries"
              :user="item"
              :key="item"
              :allEntries="allEntries"
              @itemDel="itemDel($event)"
              @itemSub="itemSub($event)"
              @itemAdd="itemAdd($event)"
              class="list-item"
            />
          </ul>
          <div class="buttons">
            <Button
              class="primary full"
              text="Roll the dice - figuratively speaking"
              @click="calcSwitch()"
            />
            <Button
              class="primary full"
              text="Roll the dice - figuratively speaking"
              @click="calcSwitch()"
            />
          </div>
        </section>
        <Adder @itemAdded="add($event)" />
      </div>
    </main>
  </transition>
  <transition name="fade">
    <Calculation v-if="calculating" :entries="entries" @calcSwitch="calcSwitch" />
  </transition>
  <footer class="footer">
    <div class="info">
      made with
      <Icon class="inline bold">favorite_border</Icon>
      <span>& vue</span>
      <br />by &copy;
      <a class="author" href="https://danielvondra.tk">Daniel Vondra</a>
    </div>
    <div class="options">
      <div v-if="!darkmode" class="darkmode">
        <span class="mono">darkmode:</span>
        <Icon class="clickable inline" @click="darkmode = true">dark_mode</Icon>
      </div>
      <div v-if="darkmode" class="darkmode">
        <span class="mono">lightmode:</span>
        <Icon class="clickable inline" @click="darkmode = false">light_mode</Icon>
      </div>
    </div>
  </footer>
</template>

<script>
import Item from '@/components/Item.vue';
import Adder from '@/components/Adder.vue';
import Button from '@/components/Button.vue';
import Calculation from '@/components/Calculation.vue';
import Icon from '@/components/Icon.vue';

export default {
  name: 'App',
  components: {
    Item,
    Adder,
    Button,
    Calculation,
    Icon,
  },
  data() {
    return {
      entries: [],
      calculating: false,
      darkmode: true,
    };
  },
  computed: {
    allEntries() {
      return Object.values(this.entries).reduce((acc, e) => acc + e.entries, 0);
    },
  },
  mounted() {
    // console.log(localStorage);
    if (localStorage.entries) {
      this.entries = JSON.parse(localStorage.entries);
    }

    this.switchModes(true);
  },
  watch: {
    entries: {
      handler(val) {
        localStorage.entries = JSON.stringify(val);
      },
      deep: true,
    },
    darkmode: {
      handler() {
        this.switchModes();
      },
    },
  },
  methods: {
    async switchModes(init = false) {
      document.documentElement.classList.add('notransitions');
      if (init) {
        if (localStorage.darkmode === undefined) {
          this.darkmode = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches;
          localStorage.darkmode = this.darkmode;
        } else {
          this.darkmode = localStorage.darkmode === 'true';
        }
      }

      document.documentElement.classList[this.darkmode ? 'add' : 'remove'](
        'darkmode',
      );
      localStorage.setItem('darkmode', this.darkmode);
      console.log('switched to:', this.darkmode ? 'darkmode' : 'lightmode');
      document
        .querySelector('meta#themeColor')
        .setAttribute(
          'content',
          this.darkmode ? 'hsl(240deg 7% 14%)' : 'hsl(0deg 0% 91%)',
        );
      await this.$sleep(1);
      document.documentElement.classList.remove('notransitions');
    },
    async add(item) {
      const i = this.entries.find((e) => e.name === item.name);
      if (i) i.entries += item.entries;
      else this.entries.push(item);
      await this.$sleep(1);
      this.$scrollToEnd(this.$refs.list);
    },
    itemDel(e) {
      // console.log('itemDel', e);
      this.entries = this.entries.filter((f) => f.name !== e);
    },
    itemSub(e) {
      // console.log('itemSub', e);
      const c = this.entries.find((f) => f.name === e);
      if (c.entries > 1) c.entries += -1;
      // if (this.entries[e] <= 0) this.itemDel(e);
    },
    itemAdd(e) {
      // console.log('itemAdd', e);
      this.entries.find((f) => f.name === e).entries += 1;
    },
    calcSwitch() {
      this.calculating = !this.calculating;
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
