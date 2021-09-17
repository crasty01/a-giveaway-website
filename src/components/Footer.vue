<template>
  <footer class="footer">
    <div class="info">
      made with
      <Icon class="inline bold">favorite_border</Icon> <span>&amp; vue</span>
      <br />by ©
      <a class="author underline" href="https://danielvondra.tk">Daniel Vondra</a>
    </div>
    <div class="options">
      <div class="darkmode">
        <span class="mono">{{ s.settings.darkmode.value ? 'lightmode' : 'darkmode' }}: </span>
        <button class="button blank inline" @click="$emit('modeChage', !s.settings.darkmode.value)">
          <Icon class="clickable inline">{{ s.settings.darkmode.value ? 'light_mode' : 'dark_mode' }}</Icon>
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  components: {
    Icon,
  },
  inject: ['s'],
  methods: {

  },
};
</script>

<style></style>
