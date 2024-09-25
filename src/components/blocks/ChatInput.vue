<template>
  <div class="chat-input">
    <EmojiPicker class="chat-input__imoji" :native="true" :theme="changeThemeDialogEmoji" @select="onSelectEmoji"
      v-if="enabledEmojiPicker" pickerType="" />

    <InputGroup>
      <InputGroupAddon>
        <Button type="file" icon="pi pi-file-arrow-up" severity="contrast" text rounded aria-label="File" />
      </InputGroupAddon>
      <InputText class="chat-input__text" v-model="message" ref="refInput" @keydown.enter="sendMessage"
        placeholder="Type a message..." />
      <InputGroupAddon>
        <Button @click="toogleDialogEmoji" icon="pi pi-face-smile" severity="contrast" text rounded
          aria-label="Emoji" />
      </InputGroupAddon>
      <InputGroupAddon>
        <Button @click="sendMessage" icon="pi pi-send" severity="contrast" text rounded aria-label="Send" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>

<script setup>
import { ref, unref, computed } from 'vue';
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';

// Define emits
const emit = defineEmits(['send']);

// Define reactive message state
const message = defineModel();
const refInput = ref(null);
const enabledEmojiPicker = ref(false)


// Define the method to send the message
const sendMessage = () => {
  enabledEmojiPicker.value = false;
  if (message.value.trim()) {
    emit('send', message.value);
    message.value = '';
    unref(refInput).focus()

  }
};

const toogleDialogEmoji = () => {
  enabledEmojiPicker.value = !enabledEmojiPicker.value;
}

const changeThemeDialogEmoji = computed(() => {
  if (document.documentElement.classList.contains('dark')) {
    return 'dark'
  } else {
    return 'light'
  }
})

const onSelectEmoji = (emoji) => {
  message.value = (message.value ? message.value : '') + emoji.i;
  console.log('emoji', emoji)
}
</script>

<style lang="scss">
.chat-input {

  .chat-input__text {
    border: none;
  }

  &__imoji {
    position: absolute;
    bottom: 6%;
    right: 0%;
  }
}
</style>
