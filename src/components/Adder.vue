<template>
  <!--<section class="adder">-->
  <form
    @submit.prevent="add([{ name, entries }])"
    autocomplete="off"
    :class="{ narrow: alerts_comp.length > 0 }"
  >
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
      <Button class="full" text="add one participant" />
      <Icon ref="success_one" class="state" padding :size="45" :success="success">{{
        input_state
      }}</Icon>
    </div>
  </form>
  <form
    @submit.prevent="add(parse(names, delimiter), true)"
    autocomplete="off"
    :class="{ narrow: alerts_comp.length > 0 }"
  >
    <div class="label-group">
      <label for="delimiter" :data-value="!!delimiter">delimiter</label>
      <input type="text" name="delimiter" id="delimiter" v-model="delimiter" />
    </div>
    <div class="label-group">
      <label for="names" :data-value="!!names">names</label>
      <textarea name="names" id="names" v-model="names" rows="4"></textarea>
    </div>
    <div class="buttons">
      <Button class="full" text="add multiple participants" />
      <Icon ref="success_multiple" class="state" padding :size="45" :success="success">{{
        input_state
      }}</Icon>
    </div>
  </form>
  <Alerts @hide="hide($event)" :alerts="alerts_comp" :key="alerts" />
  <!--</section>-->
</template>

<script>
import Button from '@/components/Button.vue';
import Alerts from '@/components/Alerts.vue';
import Icon from '@/components/Icon.vue';

import alerts from '@/assets/data/alerts.json';

export default {
  name: 'Adder',
  components: {
    Button,
    Alerts,
    Icon,
  },
  computed: {
    alerts_comp() {
      return Object.keys(this.alerts)
        .filter((f) => this?.alerts[f]?.state > 0)
        .map((f) => ({ code: f, ...this?.alerts[f] }));
    },
    input_state() {
      return this.success ? 'check_circle' : 'cancel';
    },
  },
  emits: ['itemAdded'],
  data() {
    return {
      name: '',
      names: '',
      entries: null,
      delimiter: '',
      alerts: this.defaultAlerts(),
      success: true,
    };
  },
  methods: {
    add(list, m = false) {
      this.success = false;
      this.alerts = this.defaultAlerts();
      let invalid = false;

      list.forEach((item) => {
        if (typeof item.name !== 'string') {
          this.alerts.name_notstring.state = true;
          invalid = invalid || this.alerts.name_notstring.invalidating;
        }
        if (item.name.length < 1) {
          this.alerts.name_short.state = true;
          invalid = invalid || this.alerts.name_short.invalidating;
        }
        if (item.name.length > 30) {
          if (m) {
            this.alerts.name_longdelimiter.state = true;
            invalid = invalid || this.alerts.name_longdelimiter.invalidating;
          } else {
            this.alerts.name_long.state = true;
            invalid = invalid || this.alerts.name_long.invalidating;
          }
        }
        if (typeof item.entries !== 'number') {
          this.alerts.entries_notnumber.state = true;
          invalid = invalid || this.alerts.entries_notnumber.invalidating;
        }
        if (item.entries <= 0) {
          if (item.entries === 0) this.alerts.entries_zero.state = true;
          else this.alerts.entries_negative.state = true;
          invalid = invalid || this.alerts.entries_negative.invalidating;
        }
        if (item.entries > 10) {
          if (/fofefa/gi.test(item.name)) {
            this.alerts.entries_largebutfofefa.state = true;
          } else this.alerts.entries_large.state = true;
          invalid = invalid || this.alerts.entries_large.invalidating;
        }

        if (!invalid) {
          this.success = true;
          this.$emit('itemAdded', item);
        }

        this.active('add', m, 1);
        this.active('remove', m, 2000);
      });
    },
    active(a, m, t) {
      setTimeout(() => {
        this.$refs[m ? 'success_multiple' : 'success_one'].$el.classList[a]('active');
      }, t);
    },
    parse(text, d) {
      if (text === '' || d === '' || !text || !d) {
        return [{ name: '', entries: 1 }];
      }
      const a = text.split(d);
      const b = [];
      a.forEach((e) => {
        const c = b.find((i) => i.name === e);
        if (!c) b.push({ name: e, entries: 1 });
        else c.entries += 1;
      });
      return b;
    },
    defaultAlerts() {
      return JSON.parse(JSON.stringify(alerts));
    },
    hide(alertCode) {
      delete this.alerts[alertCode];
    },
  },
};
</script>

<style></style>
