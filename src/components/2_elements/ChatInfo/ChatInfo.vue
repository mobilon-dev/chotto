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
import { AvatarIcon } from '@/components';
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
@use './styles/ChatInfo.scss';
</style>
