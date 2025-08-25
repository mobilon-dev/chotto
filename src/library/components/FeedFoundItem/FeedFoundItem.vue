<template>
  <div
    class="feed-found-item__container"
    :class="{ 'feed-found-item__selected-container': selected }"
  >
    <div class="feed-found-item__avatar-container">
      <UserAvatar :avatar="object.avatar" />
    </div>

    <div class="feed-found-item__info">
      <div class="feed-found-item__first-line">
        <p class="feed-found-item__name">
          {{ object.subtext }}
        </p>

        <p class="feed-found-item__time">
          {{ object.time }}
        </p>
      </div>

      <div class="feed-found-item__second-line">
        <img
          v-if="object.type == 'message.image'"
          :src="object.url"
          style="margin-right: 3px"
          width="24"
          height="24"
        />

        <span
          v-if="typePreview"
          :class="typePreview"
          style="margin-right: 3px; font-size: 20px"
        />

        <p>{{ object.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IFeedObject } from "../../types";
const props = defineProps({
  object: {
    type: Object as () => IFeedObject,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const typePreview = computed(() => {
  const r = {
    "message.file": "pi pi-file",
    "message.audio": "pi pi-volume-up",
    "message.video": "pi pi-video",
    "message.call": "pi pi-phone",
  };
  if (r[props.object.type]) return r[props.object.type];
  else return null;
});
</script>

<style scoped lang="scss">
.feed-found-item {
  &__container {
    padding: var(--chotto-chat-item-padding-container);
    display: flex;
    position: relative;
    cursor: pointer;
    width: 100%;
    word-wrap: anywhere;
    background-color: transparent;
    border-radius: var(--chotto-chat-item-border-radius);
  }

  &__container:hover {
    background-color: var(--chotto-item-background-color-hover);
  }

  &__selected-container {
    background-color: var(--chotto-item-background-color-focus);
  }

  &__info {
    width: 80%;
  }

  &__first-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__name {
    margin: 0;
    padding: 0;
  }

  &__time {
    color: var(--chotto-secondary-text-color);
    font-size: var(--chotto-additional-text-font-size);
    margin: 0;
    padding: 0;
  }

  &__second-line {
    display: flex;
    word-break: break-word;
    p {
      margin: 0;
      padding: 0;
      font-size: var(--chotto-text-font-size);
      color: var(--chotto-secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &__avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;

    span {
      font-size: var(--chotto-avatar-medium-icon-size);
      color: var(--chotto-avatar-color);
      line-height: 24px;
      width: 24px;
    }

    img {
      border-radius: var(--chotto-avatar-border-radius);
      object-fit: cover;
    }
  }
}
</style>
