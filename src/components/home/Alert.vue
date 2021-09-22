<template>
  <transition name="fade-vertical">
    <div class="content"  ref="content" :style="{ height: height !== 'auto' ? `${height}px` : false }" v-show="show">
      <div class="alert danger">
      <header>
        <div class="location">
          The value of <span class="bold">{{ alert.key }}</span> seems to be incorrect:
        </div>
        <Icon class="clickable" @click="close">close</Icon>
      </header>
      <div class="message">
        {{ alert.message }}
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
import Icon from '@/components/Icon.vue';
// <Icon class="clickable" @click="$emit('close', index, $event)">close</Icon>

export default {
  components: {
    Icon,
  },
  emits: ['close'],
  props: {
    alert: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      show: true,
      height: 'auto',
    };
  },
  async mounted() {
    this.height = this.$refs.content.offsetHeight;
  },
  methods: {
    close() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$t: 1;

.fade-vertical-enter-active, .fade-vertical-leave-active {
  transition: height 250ms * $t, opacity 200ms * $t, margin 150ms * $t 100ms * $t;
}
.fade-vertical-enter, .fade-vertical-leave-to {
  height: 0 !important;
  opacity: 0;
  margin-bottom: 0 !important;
}
</style>
