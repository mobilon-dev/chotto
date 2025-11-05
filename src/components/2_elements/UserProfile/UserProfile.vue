<template>
  <div
    v-if="user"
    class="profile__container"
  >
    <div
      v-if="user.avatar"
      class="profile__avatar-container"
    >
      <span
        class="profile__status"
        :style="{ backgroundColor: user.status }"
      />
      <img
        :src="user.avatar"
        height="48"
        width="48"
      >
    </div>
    <h2 class="profile__name">
      {{ user.name }}
    </h2>
    <p class="profile__email">
      {{ user.email }}
    </p>
    <p class="profile__phone">
      {{ user.phone }}
    </p>
  </div>
</template>

<script setup>

// Define props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use './styles/UserProfile.scss';
</style>
