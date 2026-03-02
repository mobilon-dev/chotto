<template>
  <div
    class="sticker-message__preview-button"
    @click="isOpenModal = true"
  >
    <!-- TGS анимированные стикеры -->
    <tgs-player
      v-if="isTgsFile && tgsLibsLoaded"
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
        :title="message.alt"
        @close="closeModal"
      >
        <!-- TGS анимированные стикеры -->
        <tgs-player
          v-if="isTgsFile && tgsLibsLoaded"
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
import { ref, watch, inject, computed, onMounted } from 'vue';
import linkifyStr from "linkify-string";
import { IStickerMessage } from '@/types';
import ModalFullscreen from '@/components/2_modals/ModalFullscreen/ModalFullscreen.vue';
import { useTheme } from "@/hooks";
import { isAnimatedSticker } from '../StickerMessage/utils/stickerUtils';
import '../StickerMessage/utils/suppress-lit-warning';

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

// Оптимизация: динамическая загрузка библиотек TGS только при необходимости
// Библиотеки tgs-player и lottie-player весят ~700KB, поэтому загружаем их только
// когда в сообщении действительно есть TGS стикер (isTgsFile === true)
// Это позволяет значительно уменьшить размер основного бандла приложения
const tgsLibsLoaded = ref(false);
const tgsLibsLoading = ref(false);

// Динамическая загрузка библиотек TGS только при необходимости
async function loadTgsLibs() {
  if (tgsLibsLoaded.value || tgsLibsLoading.value) return;
  
  tgsLibsLoading.value = true;
  try {
    await import('../StickerMessage/libs/tgs-player/lottie-player.esm.js');
    await import('../StickerMessage/libs/tgs-player/tgs-player.esm.js');
    tgsLibsLoaded.value = true;
  } catch (error) {
    console.error('Failed to load TGS libraries:', error);
  } finally {
    tgsLibsLoading.value = false;
  }
}

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

// Определяем, является ли файл TGS форматом
// Используем утилиту для единообразной проверки во всех компонентах
const isTgsFile = computed(() => {
  return isAnimatedSticker(props.message.url, props.message.isAnimated);
});

// Загружаем библиотеки TGS при необходимости
watch(isTgsFile, (needsTgs) => {
  if (needsTgs && !tgsLibsLoaded.value) {
    loadTgsLibs();
  }
}, { immediate: true });

onMounted(() => {
  if (isTgsFile.value && !tgsLibsLoaded.value) {
    loadTgsLibs();
  }
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

