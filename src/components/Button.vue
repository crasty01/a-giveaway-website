<template>
  <button class="button">
    {{ text }}
    <div class="btn-icon" v-if="icon">
      <Icon>{{ icon }}</Icon>
    </div>
    <div class="btn-icon arrow" v-else>
      <svg
        :width="size"
        :height="size"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2.67523L16 15.9995L12.9024 15.9995L12.9024 2.67523L16 2.67523Z"
          fill="#F5F5F5"
        ></path>
        <path
          d="M2.23303 0L15.8133 13.5848L13.5804 15.8184L0.000148369 2.23363L2.23303 0Z"
          fill="#F5F5F5"
        ></path>
        <path
          d="M2.68018 12.9014L16 12.9014L16 16L2.68018 16L2.68018 12.9014Z"
          fill="#F5F5F5"
        ></path>
      </svg>
    </div>
  </button>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true,
      default: 'undefined',
    },
    size: {
      require: false,
      default: 16,
      type: Number,
    },
    icon: {
      require: false,
      type: String,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style>
</style>
