<template>
  <ul>
    <li v-for="giveaway in giveaways" :key="giveaway.id">
      {{ giveaway.id }}
    </li>
  </ul>
</template>

<script>
export default {
  inject: ['s', 'h', 'supabase'],
  created() {
    if (this.s.user) this.getData();
    else {
      this.$watch(() => this.s.user, (user) => {
        if (user) this.getData();
      });
    }
  },
  data() {
    return {
      giveaways: [],
    };
  },
  methods: {
    async getData() {
      console.log('fetching data');
      const { data: giveaways, error } = await this.supabase
        .from('giveaways')
        .select('*');
      if (error) console.error(error);
      this.giveaways = giveaways;
    },
  },
};
</script>

<style>

</style>
