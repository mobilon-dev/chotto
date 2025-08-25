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

<style
  scoped
  lang="scss"
>
.profile {

  &__container {
    display: grid;
    grid-template-columns: min-content 1fr;
    padding: 20px 12px 20px 9px;
  }

  &__name {
    grid-column: 2;
    /* var*/font-size: 20px;
    margin: 0;
  }

  &__email {
    grid-column: 2;
    /* var*/font-size: 16px;
    margin: 0;
  }

  &__phone {
    grid-column: 2;
    /* var*/font-size: 16px;
    margin: 0;
  }

  &__avatar-container {
    grid-row: 1 / 4;
    position: relative;
    display: flex;
    margin: auto 15px auto 0;
    position: relative;
    border-radius: var(--chotto-avatar-border-radius);

    img {
      border-radius: var(--chotto-avatar-border-radius);
      object-fit: cover;
    }
  }

  &__status {
    position: absolute;
    bottom: 0;
    right: 5px;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: transparent;
    z-index: 1;
  }
}
</style>
