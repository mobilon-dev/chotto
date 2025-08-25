<template>
  <div
    v-if="!getMessage().isRecording"
    class="channels__container"
    :class="{ 'channels__container-disabled': state == 'disabled' }"
  >
    <div v-if="selectedChannel" class="channels__selected">
      <img v-if="selectedChannel.icon" :src="selectedChannel.icon" class="channels__icon" />
      <span class="channels__title">{{ selectedChannel.title }}</span>
    </div>
    <span v-else class="channels__selected channels__title">
      {{ t('component.ChannelSelector.Placeholder') }}
    </span>
    <ButtonContextMenu
      :actions="channels"
      :mode="mode"
      :menu-side="'top'"
      :disabled="state == 'disabled'"
      @click="selectChannel"
    >
      <span
        class="pi pi-list channels__trigger"
        :class="{ channels__disabled: state == 'disabled' }"
      />
    </ButtonContextMenu>
  </div>
</template>

<script setup>
  import { ref, inject } from 'vue'
  import { ButtonContextMenu } from '../ButtonContextMenu'
  import { t } from '../../../locale'
  import { useMessage } from '../../../helpers'

  const props = defineProps({
    channels: {
      type: Array,
      required: false,
      default: () => [],
    },
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

  const chatAppId = inject('chatAppId')
  const { getMessage } = useMessage(chatAppId)

  const emit = defineEmits(['selectChannel'])

  const getDefaultChannel = () => {
    return props.channels.find((channel) => channel.type === 'default')
  }
  const selectedChannel = ref(getDefaultChannel())

  const selectChannel = (channel) => {
    // console.log('channel selected', channel);
    selectedChannel.value = channel
    emit('selectChannel', selectedChannel.value)
  }
</script>

<style scoped lang="scss">
  .channels {
    &__container {
      display: flex;
    }

    &__container-disabled {
      color: var(--chotto-button-color-disabled);
    }

    &__title {
      font-size: var(--chotto-text-font-size);
    }

    &__selected {
      height: fit-content;
      margin: auto;
      display: flex;
      justify-content: flex-start;
      column-gap: 6px;
      align-items: center;
      margin-left: 10px;
    }

    &__icon {
      display: block;
      height: fit-content;
      width: var(--chotto-text-font-size);
      height: var(--chotto-text-font-size);
    }

    &__trigger {
      padding: var(--chotto-chat-input-button-padding) var(--chotto-chat-input-button-padding);
      display: block;
      cursor: pointer;
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-button-color-active);
    }

    &__trigger:hover {
      color: var(--chotto-button-color-hover);
    }

    &__disabled {
      color: var(--chotto-button-color-disabled);
      cursor: auto;
      pointer-events: none;
    }
  }
</style>
