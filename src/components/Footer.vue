<template>
  <footer class="footer">
    <div class="info">
      made with
      <Icon title="love" class="inline bold">favorite_border</Icon> <span>&amp; vue</span>
      <br />by ©
      <a class="author underline" href="https://danielvondra.tk">Daniel Vondra</a>
    </div>
    <div class="options" :class="{ inline: !s.settings.textOnly.value }">
      <button class="button blank inline" @click="$emit('modeChage', !s.settings.darkmode.value)">
        <Icon v-if="!s.settings.textOnly.value" :title="mode_text" class="clickable inline">{{ mode_icon }}</Icon>
        <span v-else>{{ mode_text }}</span>
      </button>
      <router-link to="/settings">
        <Icon v-if="!s.settings.textOnly.value" title="settings" class="clickable inline">settings</Icon>
        <span v-else>settings</span>
      </router-link>
    </div>
  </footer>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  components: {
    Icon,
  },
  computed: {
    mode_text() {
      return this.s.settings.darkmode.value ? 'lightmode' : 'darkmode';
    },
    mode_icon() {
      return this.s.settings.darkmode.value ? 'light_mode' : 'dark_mode';
    },
  },
  inject: ['s'],
  methods: {

  },
};
</script>

<style></style>
