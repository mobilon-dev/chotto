<template>
  <div
    class="video-message__preview-button"
    @click="isOpenModal = true"
  >
    <video
      class="video-message__video"
      :src="message.url"
      :muted="true"
    />
  </div>

  <div class="video-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="video-message__reply-description">
      <span class="pi pi-video" />
      <p>Видео</p>
    </div>
    <p
      v-if="message.text"
      class="video-message__text"
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
        <video
          ref="player"
          class="video-message__modal-video"
          :src="message.url"
          :alt="message.alt"
          controls
          autoplay
        />
      </ModalFullscreen>
    </transition>
  </Teleport>
</template>

<script
  setup
  lang="ts"
>
import { ref, watch, inject } from 'vue'
import linkifyStr from "linkify-string";
import { IVideoMessage } from '@/types';
import { ModalFullscreen } from '@/components';
import { useTheme } from "@/hooks";

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

const props = defineProps({
  message: {
    type: Object as () => IVideoMessage,
    required: true,
  },
});

const player = ref<HTMLVideoElement | null>();
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

function inNewWindow(event: Event) {
  event.preventDefault()
  if ((event.target as HTMLAnchorElement).href)
    window.open((event.target as HTMLAnchorElement).href, '_blank');
}

const closeModal = () => isOpenModal.value = false

</script>

<style scoped lang="scss">
@use './styles/ReplyVideoMessage.scss';
</style>
