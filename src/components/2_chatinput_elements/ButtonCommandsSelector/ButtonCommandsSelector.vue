<template>
  <Transition>
    <ButtonContextMenu
      v-if="commands"
      ref="refBCM"
      menu-side="top"
      :mode="mode"
      :disabled="getMessage().isRecording || state == 'disabled'"
      :actions="commands"
      @click="sendCommand"
    >
      <span 
        class="commands__trigger"
        :class="{'commands__disabled' : getMessage().isRecording || state == 'disabled'}"
      >
        /
      </span>
    </ButtonContextMenu>
  </Transition>
</template>

<script setup lang="ts">
import { useTemplateRef, inject, watch } from 'vue';
import { useMessageDraft } from '@/hooks';
import { IInputMessage } from '@/types';
import {ButtonContextMenu} from '@/components';

const props = defineProps({
  commands: {
    type: Array,
    required: false,
    default: null
  },
  mode: {
    type: String,
    required: false,
    default: 'hover',
  },
  state:{
    type: String,
    default: 'active',
  },
})

const emit = defineEmits(['send']);

const chatAppId = inject('chatAppId')
const { getMessage } = useMessageDraft(chatAppId as string)

const refBCM = useTemplateRef('refBCM')

const sendCommand = (command: Record<string, unknown>) => {
  console.log(command)
  const messageObject: IInputMessage = {
      type: 'message.command',
      text: command.action as string,
    };
  emit('send', messageObject)
}

watch(
  () => getMessage().text,
  () => {
    if (props.commands) {
      if (getMessage().text.startsWith('/')){
        refBCM.value?.updatePosition()
      }
      else {
        refBCM.value?.hideMenu()
      }
    }
  }
);

</script>

<style
  scoped
  lang="scss"
>
@use './styles/ButtonCommandsSelector.scss';
</style>
