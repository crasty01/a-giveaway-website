<template>
  <i
    class="notranslate material-icons icon"
    :class="{ padding, success }"
    translate="no"
    :style="{ fontSize: real_size + 'px', bakgroundColor: 'red'}"
    ><span><slot></slot></span></i>
</template>

<script>

// @click="isActive = !isActive"

export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 24,
    },
    padding: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    real_size() {
      return this.padding ? this.size - 16 : this.size;
    },
  },
};
</script>

<style>
</style>
