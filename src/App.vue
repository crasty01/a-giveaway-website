<template>
  <header class="header">
    <h1 class="h2">A giveaway website</h1>
  </header>
  <transition name="fade">
    <main class="main" v-if="!calculating">
      <h2 class="h3">participants:</h2>
      <div class="main-grid">
        <section class="list" :class="{ large: entries.length > 7 }">
          <div class="options">
            <select name="sort" id="sort" class="sort" v-model="sortType">
              <option v-for="(val, key) in sorts" :key="key" :value="val" :selected="false">
                {{ key }}
              </option>
            </select>
            <Button class="danger full" text="purge everyone" @click="comencePurge()" />
            <div class="count">number of entries: {{ allEntries }}</div>
          </div>
          <ul role="list" ref="list">
            <Item
              v-for="item in sortedEntries"
              :user="item"
              :key="item"
              :allEntries="allEntries"
              class="list-item"
            />
          </ul>
          <div class="buttons">
            <Button
              class="primary full"
              text="Roll the dice - figuratively speaking"
              @click="calcSwitch()"
            />
          </div>
        </section>
        <Adder @itemAdded="add($event)" :AdditionalNotes="allNotes" />
      </div>
    </main>
  </transition>
  <transition name="fade">
    <Calculation
      v-if="calculating"
      :entries="entries"
      @calcSwitch="calcSwitch"
    />
  </transition>
  <footer class="footer">
    <div class="info">
      made with
      <Icon class="inline bold">favorite_border</Icon>
      <span>&nbsp;&amp;&nbsp;vue</span>
      <br />by &copy;
      <a class="author" href="https://danielvondra.tk">Daniel Vondra</a>
    </div>
    <div class="options">
      <div v-if="!darkmode" class="darkmode">
        <span class="mono">darkmode:</span>
        <Icon class="clickable inline" @click="toggleDarkmode()">dark_mode</Icon>
      </div>
      <div v-else class="darkmode">
        <span class="mono">lightmode:</span>
        <Icon class="clickable inline" @click="toggleDarkmode()"
          >light_mode</Icon
        >
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

import dm from './darkmode';

const sorts = {
  'by name': (a, b) => a.name.localeCompare(b.name),
  'by entries': (a, b) => b.entries - a.entries,
};

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
      calculating: false,
      sortType: sorts['by name'],
    };
  },
  computed: {
    allEntries() {
      return this.entries.reduce((acc, e) => acc + e.entries, 0);
    },
    allNotes() {
      return this.entries.map((x) => x.note);
    },
    sortedEntries() {
      const copy = [...this.entries];
      return copy.sort(this.sortType);
    },
    entries() {
      return this.$store.state.entries;
    },
    darkmode() {
      return this.$store.state.darkmode;
    },
  },
  mounted() {
    dm.InitializeVuexDarkmode();
    this.SetDarkMode();
  },
  created() {
    this.sorts = sorts;
    window.addEventListener('beforeunload', () => { this.$store.dispatch('Save'); });
  },
  watch: {
    darkmode: {
      handler() {
        this.SetDarkMode();
      },
    },
  },
  methods: {
    toggleDarkmode() {
      dm.UnregisterDarkmodeChanges();
      this.$store.commit('ToggleDarkModeWithUserPrefers');
    },
    async SetDarkMode() {
      document.documentElement.classList.add('notransitions');
      document.documentElement.classList[this.darkmode ? 'add' : 'remove']('darkmode');
      console.log('switched to:', this.darkmode ? 'darkmode' : 'lightmode');
      document
        .querySelector('meta#themeColor')
        .setAttribute('content', this.darkmode ? 'hsl(240deg 7% 14%)' : 'hsl(0deg 0% 91%)');
      await this.$sleep(1);
      document.documentElement.classList.remove('notransitions');
    },
    async add(item) {
      this.$store.commit('IncrementUser', {
        name: item.name,
        note: item.note === '' ? undefined : item.note,
        delta: item.entries,
      });
      await this.$sleep(1);
      this.$scrollToEnd(this.$refs.list);
    },
    itemDel(e) {
      // console.log('itemDel', e);
      this.$store.commit('RemoveUser', e);
    },
    itemSub(e) {
      // console.log('itemSub', e);
      this.$store.commit('IncrementUser', { name: e, delta: -1 });
    },
    itemAdd(e) {
      // console.log('itemAdd', e);
      this.$store.commit('IncrementUser', { name: e, delta: 1 });
    },
    calcSwitch() {
      this.calculating = !this.calculating;
    },
    comencePurge() {
      // TODO: Make it beautiful
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure?')) {
        this.$store.commit('PurgeEntries');
      }
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
