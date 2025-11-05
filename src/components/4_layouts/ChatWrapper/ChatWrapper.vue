<template>
  <div
    :id="'chat-wrapper-' + chatAppId"
    class="chat-wrapper"
    :class="applyStyle()"
  >
    <div
      v-if="isSelectedChat"
      class="chat-wrapper__selected-chat"
    >
      <slot name="default" />
    </div>

    <div
      v-else
      style="display: flex; width: 100%;"
    >
      <div style="margin: auto;">
        <slot name="placeholder" />
      </div>
    </div>

    <div
      v-if="isOpenChatPanel"
      class="chat-wrapper__chat-panel"
    >
      <slot name="chatpanel" />
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
>
import { inject } from 'vue';

defineProps({
  isOpenChatPanel: {
    type: Boolean,
    default: false,
  },
  isSelectedChat: {
    type: Boolean,
    default: false,
  },
  chatPanelWidth: {
    type: Number,
    required: false,
    default: 50,
  },
    applyStyle: {
    type: Function,
    default: () => {return null}
  }
})

const chatAppId = inject('chatAppId')

// watch(
//   () => props.chatPanelWidth,
//   () => {
//     const container = document.getElementById('chat-wrapper-' + chatAppId)
//     if (container){
//       container.style.setProperty('--chotto-chat-panel-width', props.chatPanelWidth + '%')
//       container.style.setProperty('--chotto-chat-panel-left', (100 - props.chatPanelWidth) + '%')
//     }
//   },
//   {immediate: true}
// )
</script>


<style scoped lang="scss">
@use './styles/ChatWrapper.scss';
</style>
