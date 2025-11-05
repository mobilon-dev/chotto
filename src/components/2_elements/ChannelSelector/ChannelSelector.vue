<template>
  <div 
    v-if="!getMessage().isRecording"
    class="channels__container"
    :class="{'channels__container-disabled' : state == 'disabled'}"
  >
    <div
      v-if="selectedChannel"
      class="channels__selected"
    >
      <img 
        v-if="selectedChannel.icon"
        :src="selectedChannel.icon"
        class="channels__icon"
      >
      <span class="channels__title">{{ selectedChannel.title }}</span>
    </div>
    <span
      v-else
      class="channels__selected channels__title"
    >
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
        :class="{'channels__disabled' : state == 'disabled'}"
      />
    </ButtonContextMenu>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { ButtonContextMenu } from '@/components';
import { t } from '../../../locale/useLocale';
import { useMessageDraft } from '@/hooks';

const props = defineProps({
  channels: {
    type: Array,
    required: false,
    default: () => [],
  },
  mode: {
    type: String,
    required: false,
    default: 'hover'
  },
  state:{
    type: String,
    default: 'active',
  },
})

const chatAppId = inject('chatAppId')
const { getMessage } = useMessageDraft(chatAppId)

const emit = defineEmits(['selectChannel']);

const getDefaultChannel = () => {
  return props.channels.find(channel => channel.type === 'default');
}
const selectedChannel = ref(getDefaultChannel())

const selectChannel = (channel) => {
  // console.log('channel selected', channel);
  selectedChannel.value = channel;
  emit('selectChannel', selectedChannel.value);
}

</script>

<style
  scoped
  lang="scss"
>
@use './styles/ChannelSelector.scss';
</style>
