<template>
  <Button v-if="!s.user" class="primary" @click="signIn">sign in with twitch</Button>
  <div v-if="s.user" class="profile">
    <button class="button blank short" :class="{ open: isProfileOpen }" @click.prevent="isProfileOpen ? closeProfile($event) : openProfile()">
      <img class="profile--picture" :src="s.user.user_metadata.avatar_url" alt="profile picture" />
      <Icon class="dropdown" :size="32">{{ isProfileOpen ? "arrow_drop_up" : "arrow_drop_down" }}</Icon>
    </button>
    <transition name="fade">
      <div class="info" v-if="isProfileOpen" v-click-away="closeProfile">
        <div class="list">
          <ul role="list">
            <li>signed in as <strong>{{ s.user.user_metadata.full_name }}</strong></li>
          </ul>
        </div>
        <div class="list">
          <ul role="list">
            <li><router-link to="giveaways">my giveaways</router-link></li>
          </ul>
        </div>
        <div class="list">
          <ul role="list">
            <li>
              <Button class="button blank" @click="signOut" icon=" ">sign out</Button>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

export default {
  components: {
    Button,
    Icon,
  },
  inject: ['supabase', 'h', 's'],
  data() {
    return {
      isProfileOpen: false,
    };
  },
  watch: {
    $route() {
      this.closeProfile();
    },
  },
  methods: {
    async signIn() {
      const { error } = this.supabase.auth.signIn({ provider: 'twitch' });
      if (error) console.error(error);
    },
    async signOut() {
      const { error } = await this.supabase.auth.signOut();
      if (error) console.error(error);
    },
    closeProfile(e) {
      this.isProfileOpen = false;
      if (e?.x !== 0 && e?.y !== 0) document.activeElement.blur();
    },
    openProfile() {
      this.isProfileOpen = true;
    },
  },
};
</script>

<style></style>
