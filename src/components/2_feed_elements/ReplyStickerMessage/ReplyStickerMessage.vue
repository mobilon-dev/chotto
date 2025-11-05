<template>
  <div
    class="sticker-message__preview-button"
    @click="isOpenModal = true"
  >
    <!-- TGS анимированные стикеры -->
    <tgs-player
      v-if="isTgsFile"
      class="sticker-message__preview-image-animated"
      :src="message.url"
      autoplay
      loop
      mode="normal"
    />
    <!-- WebP и другие статические стикеры -->
    <img
      v-else
      class="sticker-message__preview-image"
      :src="message.url"
      :alt="message.alt"
    >
  </div>

  <div class="sticker-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="sticker-message__reply-description">
      <span class="pi pi-image" />
      <p>Стикер</p>
    </div>
    <p
      v-if="message.text"
      class="sticker-message__text"
      @click="inNewWindow"
      v-html="linkedText"
    />
  </div>

  <Teleport to="body">
    <transition name="modal-fade">
      <ModalFullscreen
        v-if="isOpenModal"
        :data-theme="getTheme().theme ? getTheme().theme : 'light'"
        @close="closeModal"
      >
        <!-- TGS анимированные стикеры -->
        <tgs-player
          v-if="isTgsFile"
          class="sticker-message__modal-image-animated"
          :src="message.url"
          autoplay
          loop
          mode="normal"
        />
        <!-- WebP и другие статические стикеры -->
        <img
          v-else
          class="sticker-message__modal-image"
          :src="message.url"
          :alt="message.alt"
        >
      </ModalFullscreen>
    </transition>
  </Teleport>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch, inject, computed } from 'vue';
import linkifyStr from "linkify-string";
import { IStickerMessage } from '@/types';
import { ModalFullscreen } from '@/components';
import { useTheme } from "@/hooks";

import '@/utils/suppress-lit-warning';
import '../StickerMessage/libs/tgs-player/lottie-player.esm.js';
import '../StickerMessage/libs/tgs-player/tgs-player.esm.js';

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

const props = defineProps({
  message: {
    type: Object as () => IStickerMessage,
    required: true,
  },
});


const isOpenModal = ref(false);

const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    if (props.message.text) {
      linkedText.value = linkifyStr(props.message.text)
    }
  },
  { immediate: true }
)

// Определяем, является ли файл TGS форматом (определяется только по URL)
const isTgsFile = computed(() => {
  const url = props.message.url;
  if (!url) return false;
  
  const urlString = String(url);
  const urlLower = urlString.toLowerCase();
  
  // Проверка по расширению в URL (работает даже после обработки Vite с хешами)
  if (urlLower.includes('.tgs') || urlLower.includes('animatedsticker')) {
    return true;
  }
  
  return false;
});

function inNewWindow(event: Event) {
  event.preventDefault()
  if ((event.target as HTMLAnchorElement).href)
    window.open((event.target as HTMLAnchorElement).href, '_blank');
}

const closeModal = () => isOpenModal.value = false

</script>

<style scoped lang="scss">
@use './styles/ReplyStickerMessage.scss';
</style>

