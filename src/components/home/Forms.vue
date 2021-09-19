<template>
  <form @submit.prevent="h.entries.add([{ name, entries }])" autocomplete="off">
    <div class="row">
      <div class="label-group">
        <label for="name" :data-value="!!name">name</label>
        <input type="text" name="name" id="name" v-model="name" />
      </div>
      <div class="label-group">
        <label for="entries" :data-value="!!entries">entries</label>
        <input type="number" name="entries" id="entries" v-model="entries" />
      </div>
    </div>
    <div class="buttons">
      <Button class="full">add one participant</Button>
      <Icon :title="input_title" ref="success_one" class="state" padding :size="45" :success="success">{{ input_state }}</Icon>
    </div>
  </form>
  <form @submit.prevent="h.entries.add(h.entries.parse(names), true)" autocomplete="off">
    <div class="label-group">
      <label for="names" :data-value="!!names">names</label>
      <textarea name="names" id="names" v-model="names" rows="4"></textarea>
    </div>
    <div class="buttons">
      <Button class="full">add multiple participants</Button>
      <Icon :title="input_title"
        ref="success_multiple"
        class="state"
        padding
        :size="45"
        :success="success"
      >{{ input_state }}</Icon>
    </div>
  </form>
</template>

<script>
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

export default {
  inject: ['h', 's'],
  components: {
    Button,
    Icon,
  },
  data() {
    return {
      name: '',
      entries: '',
      names: '',
      success: true,
    };
  },
  computed: {
    input_state() {
      return this.success ? 'check_circle' : 'cancel';
    },
    input_title() {
      return this.success ? 'success' : 'failure';
    },
  },
  methods: {
    // parse: this.h.entries.parse, // TODO: this.h.entries.parse
  },
};
</script>

<style>
</style>
