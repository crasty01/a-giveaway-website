<template>
  <transition name="fade-vertical">
    <div class="content"  ref="content" :style="{ height: height !== 'auto' ? `${height}px` : height }" v-show="show">
      <div class="alert danger">
      <header>
        <div class="location" v-if="alert.key">
          The value of <span class="bold">{{ alert.key }}</span> seems to be incorrect:
        </div>
        <div class="location" v-else>
          Something went wrong:
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
  created() {
    window.addEventListener('resize', this.recalculate);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.recalculate);
  },
  data() {
    return {
      show: true,
      height: 'auto',
    };
  },
  async mounted() {
    this.recalculate();
  },
  methods: {
    close() {
      this.show = false;
    },
    recalculate() {
      this.height = 'auto';
      this.$nextTick(() => {
        this.height = this.$refs.content.offsetHeight;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$t: 1;

.fade-vertical-enter-active, .fade-vertical-leave-active {
  transition: height 250ms * $t, opacity 200ms * $t, margin 150ms * $t 100ms * $t;
  transition-timing-function: ease-out;
}
.fade-vertical-enter, .fade-vertical-leave-to {
  height: 0 !important;
  opacity: 0;
  margin-bottom: 0 !important;
}
</style>
