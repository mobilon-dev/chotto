<template>
  <div class="profile">
    <div v-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
    </div>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.profile {
  padding: 16px 16px 16px 16px;
}
</style>
