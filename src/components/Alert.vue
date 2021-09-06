<template>
  <span class="alert" :class="alert.type" :data-alertcode="alert.code">
    <Icon class="clickable" @click="hide">close</Icon>
    {{ alert.response }}
    </span>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'Alert',
  components: {
    Icon,
  },
  emits: ['hide'],
  props: {
    alert: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.alert.type !== 'danger') {
      setTimeout(() => {
        this.hide();
      }, 3000);
    }
  },
  methods: {
    hide() {
      this.$emit('hide', this.alert.code);
    },
  },
};
</script>

<style>
</style>
