<template>
  <button
    v-if="!getMessage().isRecording"
    ref="emojiButton"
    class="button"
    :class="{'button-disabled' : state == 'disabled'}"
    @click="toggleEmojiPicker"
  >
    <span class="">
      <SmilesIcon />
    </span>
  </button>
  <Transition>
    <div 
      v-show="isEmojiPickerVisible"
      ref="emoji" 
      class="emoji"
    >
      <EmojiPicker
        :native="true"
        :theme="emojiTheme"
        picker-type=""
        @select="onSelectEmoji"
      />
    </div>
  </Transition>
</template>

<script setup>
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import {onMounted, onUnmounted, ref, inject} from 'vue'
// import {computed} from 'vue'
import { useMessage } from '../../helpers/useMessage';
import SmilesIcon from '../icons/SmilesIcon.vue';


const props = defineProps({
  state: {
    type: String,
    default: 'active',
  },
})

const emoji = ref(null)
const emojiTheme = ref('light')
const emojiButton = ref(null)
const isEmojiPickerVisible = ref(false)
const chatAppId = inject('chatAppId')
const { setMessageText, getMessage } = useMessage(chatAppId)

const changeThemeDialogEmoji = () => {
  if (document.getElementById(chatAppId).attributes['data-theme'].nodeValue.indexOf('dark') != -1) {
    return 'dark'
  }
  return 'light'
}

const onSelectEmoji = (emoji) => {
  setMessageText(getMessage().text + emoji.i);
  // console.log('emoji', emoji)
}

const toggleEmojiPicker = () => {
  if (props.state !== 'active') return;
  
  isEmojiPickerVisible.value = !isEmojiPickerVisible.value;
  if (isEmojiPickerVisible.value) {
    emojiTheme.value = changeThemeDialogEmoji();
  }
}

const closeEmojiPicker = () => {
  isEmojiPickerVisible.value = false;
}

const handleClickOutside = (event) => {
  if (isEmojiPickerVisible.value && 
      !emojiButton.value.contains(event.target) && 
      !emoji.value.contains(event.target)) {
    closeEmojiPicker();
  }
}

onMounted(() => {
  emoji.value.style.display = 'none'
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})

</script>

<style
  scoped
  lang="scss"
>
  .button {
    background-color: transparent;
    border: none;
    height: fit-content;
    span {
      display: block;
      cursor: pointer;
      padding: 0;
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-button-color-active);
    }
  }

  .button:hover span{
    color: var(--chotto-button-color-hover);
  }

  .button-disabled{
    pointer-events: none;
    span{
      cursor: auto;
      color: var(--chotto-button-color-disabled);
    }
  }
  .emoji {
    position: absolute;
    bottom: 50px;
  }

</style>
