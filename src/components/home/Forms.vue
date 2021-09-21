<template>
  <Form @submit="single" autocomplete="off">
    <div class="row">
      <div class="label-group">
        <label for="name" :data-value="!!formData.name">name</label>
        <Field name="name" type="text" v-slot="{ field }">
          <input v-bind="field" v-model.number="formData.name"/>
        </Field>
      </div>
      <div class="label-group">
        <label for="entries" :data-value="!!formData.entries">entries</label>
        <Field name="entries" type="number" v-slot="{ field }">
          <input v-bind="field" v-model.number="formData.entries"/>
        </Field>
      </div>
    </div>
    <div class="buttons">
      <Button class="full">add one participant</Button>
      <Icon :title="input_title" ref="success_one" class="state" :class="{ active: show.single, success }" padding :size="45" :success="success">{{ input_state }}</Icon>
    </div>
  </Form>
  <Form @submit="multiple" autocomplete="off">
    <div class="label-group">
      <label for="names" :data-value="!!formData.names">names</label>
      <Field name="names" type="text" v-slot="{ field }">
        <textarea v-bind="field" v-model.number="formData.names" rows="4"></textarea>
      </Field>
    </div>
    <div class="buttons">
      <Button class="full">add multiple participants</Button>
      <Icon :title="input_title" ref="success_multiple" class="state" :class="{ active: show.multiple, success }" padding :size="45" :success="success">{{ input_state }}</Icon>
    </div>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate';
import { markRaw } from 'vue';
import * as yup from 'yup';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

export default {
  inject: ['h', 's'],
  components: {
    Form,
    Field,
    Button,
    Icon,
  },
  emits: ['alert'],
  data() {
    return {
      success: true,
      formData: {
        name: '',
        names: '',
        entries: 0,
      },
      show: {
        single: false,
        multiple: false,
      },
      schema: markRaw(yup.object({
        name: yup.string().min(3).max(26).required(),
        entries: yup.number().positive().required(),
      })),
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
    async single(input, event, m = false) {
      if (m ? input.last : true) this.success = true;
      const value = {
        name: (input.name || '').trim(),
        entries: input.entries,
      };
      const validated = await this.schema.validate(value, { abortEarly: false }).catch((e) => {
        this.success = false;
        this.$emit('alert', e.errors, m ? input.last : true);
      });
      if (validated) this.h.entries.add(validated);

      // success + remove
      this.show[m ? 'multiple' : 'single'] = true;
      await this.h.others.sleep(600);
      if (!m || input.last) this.show[m ? 'multiple' : 'single'] = false;
    },

    async multiple({ names = '' }, event) {
      const entries = this.h.entries.fromArray(this.h.entries.parse(names));
      Object.keys(entries).forEach((key, i, a) => {
        this.single({ name: key, entries: entries[key], last: i === a.length - 1 }, event, true);
      });
    },
  },
};
</script>

<style>
</style>
