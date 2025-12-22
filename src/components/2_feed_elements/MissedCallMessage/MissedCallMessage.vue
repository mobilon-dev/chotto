<template>
  <div
    :class="[
      getClass(message),
      applyStyle(message)
    ]"
    :messageId="message.messageId"
    @mouseenter="showMenu"
    @mouseleave="hideMenu"
  >
    <img
      v-if="message.avatar"
      class="missed-call-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
      :style="{ gridRow: message.subText ? '2' : '1' }"
    >

    <p
      v-if="message.subText"
      class="missed-call-message__subtext"
    >
      <Tooltip
        :text="subtextTooltipText"
        position="right"
        :offset="8"
      >
        {{ message.subText }}
      </Tooltip>
    </p>

    <div
      class="missed-call-message__content"
      :class="{ 'is-first': true }"
    >
      <div class="missed-call-message__main-content">
        <div class="missed-call-message__icon-wrapper">
          <MissedCallIcon
            class="missed-call-message__icon"
          />
        </div>
        <p class="missed-call-message__text">
          Пропущенный звонок
        </p>
      </div>

      <div class="missed-call-message__info-container">
        <span class="missed-call-message__time">{{ message.time }}</span>
      </div>

      <button
        v-if="buttonMenuVisible && message.actions"
        class="missed-call-message__menu-button"
        @click="isOpenMenu = !isOpenMenu"
      >
        <span class="pi pi-ellipsis-h" />
      </button>

      <transition>
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="missed-call-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { IMissedCallMessage } from '@/types'
import { useMessageActions, useSubtextTooltip } from '@/hooks/messages'
import { getMessageClass } from '@/functions'
import ContextMenu from '@/components/1_atoms/ContextMenu/ContextMenu.vue'
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue'
import MissedCallIcon from './icons/MissedCallIcon.vue'

const emit = defineEmits(['action', 'reply'])

// Define props
const props = defineProps({
  message: {
    type: Object as () => IMissedCallMessage,
    required: true,
  },
  applyStyle: {
    type: Function,
    default: () => {return null}
  },
  subtextTooltipData: {
    type: Object as () => Record<string, string>,
    required: false,
    default: () => ({})
  }
})

const {
  isOpenMenu,
  buttonMenuVisible,
  showMenu,
  hideMenu,
  clickAction,
} = useMessageActions(props.message, emit)

const subtextTooltipText = useSubtextTooltip(() => props.message, () => props.subtextTooltipData)

function getClass(message: IMissedCallMessage) {
  return getMessageClass(message.position, 'missed-call-message')
}
</script>

<style scoped lang="scss">
@use './styles/MissedCallMessage.scss';
</style>

