<template>
  <div
    v-if="chat"
    class="chat-info__container"
  >
    <div class="chat-info__base-line">
      <span 
        v-if="showReturnButton"
        class="pi pi-arrow-left chat-info__return-button"
        @click="emit('returnToChats')"
      />
      <div class="chat-info__avatar-container">
        <img
          v-if="props.chat.avatar"
          :src="props.chat.avatar"
          width="40"
          height="40"
        >
        <span
          v-else
          class=""
        >
          <AvatarIcon :size="40" />
        </span>
      </div>
      <div class="chat-info__info-container">
        <span class="chat-info__title">
          {{ chat.name }}
          <span
            v-if="additionalTitle"
            class="chat-info__additional-title"
          >
            {{ additionalTitle }}
          </span>
        </span>
        <p
          v-if="chatDescription"
          class="chat-info__time"
        >
          <slot name="img-description" />
          {{ chatDescription }}
        </p>
      </div>
      <div class="chat-info__actions">
        <slot name="actions" />
      </div>
    </div>
    
    
    <div 
      :id="'chat-info-search-panel-' + chatAppId"
      class="chat-info__search-panel"  
    >
      <slot name="search" />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import AvatarIcon from '../icons/AvatarIcon.vue';
// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
  showReturnButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  additionalTitle:{
    type: String,
    required: false,
    default: '',
  },
  defaultLastActivityTime: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const emit = defineEmits(['returnToChats']);

const chatAppId = inject('chatAppId')

const chatDescription = computed(() => {
  if (props.description) return props.description
  if (!props.description && props.defaultLastActivityTime) return props.chat['lastActivity.time']
  return undefined
})

</script>

<style
  scoped
  lang="scss"
>
.chat-info {
  &__container {
    border-radius: var(--chotto-chat-info-border-radius);
    padding: var(--chotto-chat-info-padding);
    border-bottom: 1px solid  var(--chotto-item-border-color);
    background-color: var(--chotto-chat-info-background-color);
  }

  &__base-line{
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--chotto-avatar-border-radius);
    background-size: cover;

    span {
      color: var(--chotto-avatar-color);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      width: var(--chotto-chat-avatar-small, var(--chotto-avatar-small));
      height: var(--chotto-chat-avatar-small, var(--chotto-avatar-small));
      border-radius: var(--chotto-avatar-border-radius);
      object-fit: cover;
    }
  }

  &__info-container {
    display: flex;
    flex-direction: column;
  }

  &__title {
    display: flex;
    grid-column: 2;
    color: var(--chotto-primary-text-color);
    font-size: var(--chotto-title-font-size);
    font-weight: var(--chotto-title-font-weight);
    margin: 0;
  }

  &__additional-title{
    margin: auto;
    font-size: var(--chotto-text-font-size);
    padding: 0 10px;
    border: 1px solid var(--chotto-chat-info-additional-title-border-color);
    border-radius: 5px;
    margin-left: 15px;
  }

  &__time {
    display: flex;
    font-size: var(--chotto-text-font-size);
    color: var(--chotto-secondary-text-color);
    grid-column: 2;
    margin: 0;
  }

  &__actions {
    margin-left: auto;
  }

  &__return-button{
    border: 0px;
    background-color: transparent;
    cursor: pointer;
    color: var(--chotto-button-color-active);
  }
}

</style>
