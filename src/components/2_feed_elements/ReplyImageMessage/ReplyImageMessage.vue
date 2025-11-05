<template>
  <div
    class="image-message__preview-button"
    @click="isOpenModal = true"
  >
    <img
      class="image-message__preview-image"
      :src="message.url"
      :alt="message.alt"
    >
  </div>

  <div class="image-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="image-message__reply-description">
      <span class="pi pi-camera" />
      <p>Фотография</p>
    </div>
    <p
      v-if="message.text"
      class="image-message__text"
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
        <img
          class="image-message__modal-image"
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
import { ref, watch, inject } from 'vue';
import linkifyStr from "linkify-string";
import { IImageMessage } from '@/types';
import { ModalFullscreen } from '@/components';
import { useTheme } from "@/hooks";

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

const props = defineProps({
  message: {
    type: Object as () => IImageMessage,
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

function inNewWindow(event: Event) {
  event.preventDefault()
  if ((event.target as HTMLAnchorElement).href)
    window.open((event.target as HTMLAnchorElement).href, '_blank');
}

const closeModal = () => isOpenModal.value = false

</script>

<style scoped lang="scss">
@use './styles/ReplyImageMessage.scss';
</style>
