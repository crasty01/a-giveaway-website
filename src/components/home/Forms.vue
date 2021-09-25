<template>
  <div class="forms">
    <form @submit.prevent="single" autocomplete="off">
      <div class="row">
        <div class="label-group">
          <label for="name" :data-value="!!formData.name">name</label>
          <input type="text" name="name" v-model="formData.name"/>
        </div>
        <div class="label-group">
          <label for="entries" :data-value="!!formData.entries">entries</label>
          <input type="number" name="entries" v-model="formData.entries"/>
        </div>
        <div class="label-group">
          <select class="input" name="method" v-model="formData.method">
            <option v-for="method in s.settings.methods" :key="method" :value="method.code">{{ method.name }}</option>
          </select>
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
  </div>
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
        method: 'undef',
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
      this.successIndicationOn(false);

      this.formData.name = this.formData.name.trim() || '';
      this.formData.entries = (+this.formData.entries || 0) === 0 ? '' : +this.formData.entries;
      // this.formData.method = this.formData.method;

      const entries = {
        [this.formData.name.toLowerCase()]: {
          entries: +this.formData.entries,
          method: this.formData.method || 'undef',
          name: this.formData.name,
        },
      };

      this.add(entries);
      this.successIndicationOff(false);
    },
    async multiple() {
      this.successIndicationOn(true);
      const parsed = this.h.entries.parse(this.formData.names);
      this.formData.names = parsed.join(' ');
      const entries = this.h.entries.fromArray(parsed);
      // console.log(entries);
      this.add(entries);
      this.successIndicationOff(true);
    },
    add(entries) {
      // console.log(entries);
      try {
        this.$emit('alert', []);
        this.h.entries.validate(entries);
        this.s.entries = this.h.entries.add(this.s.entries, entries);
      } catch (e) {
        this.success = false;
        this.$emit('alert', e);
      }
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
