<template>
  <footer class="footer">
    <div class="info">
      made with
      <Icon class="inline bold">favorite_border</Icon> <span>&amp; vue</span>
      <br />by ©
      <a class="author underline" href="https://danielvondra.tk">Daniel Vondra</a>
    </div>
    <div class="options">
      <div v-if="!s.darkmode" class="darkmode">
        <span class="mono">darkmode: </span>
        <button class="button blank inline" @click="$emit('modeChage', true)">
          <Icon class="clickable inline">dark_mode</Icon>
        </button>
      </div>
      <div v-if="s.darkmode" class="lightmode">
        <span class="mono">lightmode: </span>
        <button class="button blank inline" @click="$emit('modeChage', false)">
          <Icon class="clickable inline">light_mode</Icon>
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
