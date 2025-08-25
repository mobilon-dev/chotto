<template>
  <button
    v-if="!getMessage().isRecording"
    ref="emojiButton"
    class="button"
    :class="{ 'button-disabled': state == 'disabled' }"
    @click="toggle"
    @mouseenter="hover"
    @mouseleave="hoverout"
  >
    <span class="pi pi-face-smile" />
  </button>
  <Transition>
    <div
      v-show="props.state === 'active'"
      ref="emoji"
      class="emoji"
      @mouseenter="hover"
      @mouseleave="hoverout"
    >
      <EmojiPicker :native="true" :theme="emojiTheme" picker-type="" @select="onSelectEmoji" />
    </div>
  </Transition>
</template>

<script setup>
  // import picker compopnent
  import EmojiPicker from 'vue3-emoji-picker'
  import 'vue3-emoji-picker/css'
  import { onMounted, onUnmounted, ref, inject } from 'vue'
  // import {computed} from 'vue'
  import { useMessage } from '../../../helpers'

  const props = defineProps({
    mode: {
      type: String,
      required: false,
      default: 'hover',
    },
    state: {
      type: String,
      default: 'active',
    },
  })

  const emoji = ref(null)
  const emojiTheme = ref('light')
  const emojiButton = ref(null)
  const chatAppId = inject('chatAppId')
  const { setMessageText, getMessage } = useMessage(chatAppId)

  const changeThemeDialogEmoji = () => {
    if (
      document.getElementById(chatAppId).attributes['data-theme'].nodeValue.indexOf('dark') != -1
    ) {
      return 'dark'
    }
    return 'light'
  }

  const onSelectEmoji = (emoji) => {
    setMessageText(getMessage().text + emoji.i)
    // console.log('emoji', emoji)
  }

  const toggle = () => {
    if (props.mode == 'click' && props.state == 'active') {
      emoji.value.style.display = 'inherit'
      emojiTheme.value = changeThemeDialogEmoji()
    }
  }

  const hover = () => {
    if (props.mode == 'hover' && props.state == 'active') {
      emoji.value.style.display = 'inherit'
      emojiTheme.value = changeThemeDialogEmoji()
    }
  }

  const hoverout = () => {
    if (props.mode == 'hover' && props.state == 'active') {
      emoji.value.style.display = 'none'
    }
  }

  const handleClickOutside = (event) => {
    if (
      props.mode == 'click' &&
      !emojiButton.value.contains(event.target) &&
      !emoji.value.contains(event.target)
    ) {
      emoji.value.style.display = 'none'
    }
  }

  onMounted(() => {
    emoji.value.style.display = 'none'
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style scoped lang="scss">
  .button {
    background-color: transparent;
    border: none;
    height: fit-content;
    span {
      display: block;
      cursor: pointer;
      padding: var(--chotto-chat-input-button-padding);
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-button-color-active);
    }
  }

  .button:hover span {
    color: var(--chotto-button-color-hover);
  }

  .button-disabled {
    pointer-events: none;
    span {
      cursor: auto;
      color: var(--chotto-button-color-disabled);
    }
  }
  .emoji {
    position: absolute;
    bottom: 50px;
  }
</style>
