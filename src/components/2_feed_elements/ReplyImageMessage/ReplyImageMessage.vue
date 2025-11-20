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
      v-html="linkedHtml"
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
import { ref, inject } from 'vue';
import { IImageMessage } from '@/types';
import { ModalFullscreen } from '@/components';
import { useTheme } from "@/hooks";
import { useMessageLinks } from '@/hooks/messages';

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId as string)

const props = defineProps({
  message: {
    type: Object as () => IImageMessage,
    required: true,
  },
});

const isOpenModal = ref(false);

const { linkedHtml, inNewWindow } = useMessageLinks(() => props.message.text)

const closeModal = () => isOpenModal.value = false

</script>

<style scoped lang="scss">
@use './styles/ReplyImageMessage.scss';
</style>
