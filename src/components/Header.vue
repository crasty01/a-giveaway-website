<template>
  <header class="header">
    <div class="logo">
      <router-link to="/" class="h3">giveaway</router-link>
    </div>
    <nav class="nav">
      <router-link to="/about">about</router-link>
      <router-link to="/guide">guide</router-link>
    </nav>
    <Profile/>
  </header>
</template>

<script>
import Profile from '@/components/Profile.vue';

export default {
  components: {
    Profile,
  },
};
</script>
