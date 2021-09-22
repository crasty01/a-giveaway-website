<template>
  <form @submit.prevent="single" autocomplete="off">
    <div class="row">
      <div class="label-group">
        <label for="name" :data-value="!!formData.name">name</label>
        <input type="text" v-model="formData.name"/>
      </div>
      <div class="label-group">
        <label for="entries" :data-value="!!formData.entries">entries</label>
        <input type="number" v-model="formData.entries"/>
      </div>
    </div>
    <div class="buttons">
      <Button class="full">add one participant</Button>
      <Icon :title="input_title" ref="success_one" class="state" :class="{ active: show.single, success }" padding :size="45" :success="success">{{ input_state }}</Icon>
    </div>
  </form>
  <form @submit.prevent="multiple" autocomplete="off">
    <div class="label-group">
      <label for="names" :data-value="!!formData.names">names</label>
      <textarea v-model="formData.names" rows="4"></textarea>
    </div>
    <div class="buttons">
      <Button class="full">add multiple participants</Button>
      <Icon :title="input_title" ref="success_multiple" class="state" :class="{ active: show.multiple, success }" padding :size="45" :success="success">{{ input_state }}</Icon>
    </div>
  </form>
</template>

<script>
// import { Form, Field } from 'vee-validate';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

export default {
  inject: ['h', 's'],
  components: {
    Button,
    Icon,
  },
  emits: ['alert'],
  data() {
    return {
      success: true,
      schemaForSingleEntry: this.h.others.schemaForSingleEntry,
      schemaForMultipleEntries: this.h.others.schemaForMultipleEntries,
      formData: {
        name: '',
        names: '',
        entries: '',
      },
      show: {
        single: false,
        multiple: false,
      },
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
    async single() {
      const input = { name: this.formData.name, entries: this.formData.entries };
      this.successIndicationOn(false);
      const entries = { [input.name.trim() || '']: (+input.entries || 0) };
      [this.formData.name, this.formData.entries] = [Object.entries(entries)[0][0], Object.entries(entries)[0][1]];
      try {
        this.$emit('alert', []);
        this.h.entries.validate(entries);
        this.s.entries = this.h.entries.add(this.s.entries, entries);
      } catch (e) {
        this.success = false;
        this.$emit('alert', e);
      }
      this.successIndicationOff(false);
    },
    async multiple() {
      const input = this.formData.names;
      this.successIndicationOn(true);
      const parsed = this.h.entries.parse(input);
      this.formData.names = parsed.join(' ');
      const entries = parsed.length > 0 ? this.h.entries.fromArray(parsed) : { '': 0 };
      try {
        this.$emit('alert', []);
        this.h.entries.validate(entries);
        this.s.entries = this.h.entries.add(this.s.entries, entries);
      } catch (e) {
        this.$emit('alert', e);
        this.success = false;
      }
      this.successIndicationOff(true);
    },
    successIndicationOn(type) {
      this.success = true;
      this.show[type ? 'multiple' : 'single'] = true;
    },
    async successIndicationOff(type) {
      await this.h.others.sleep(600);
      this.show[type ? 'multiple' : 'single'] = false;
    },
  },
};
</script>

<style>
</style>
