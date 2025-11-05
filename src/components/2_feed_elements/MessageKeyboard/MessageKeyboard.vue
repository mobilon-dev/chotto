<template>
  <div
    ref="keyboard"
    class="keyboard__container"
    :class="[`keyboard__container--${align}`]"
  >
    <div 
      v-for="key in keyboard"
      :key="key.text"
      class="keyboard__key"
      :style="{'box-shadow': '0px 0px 10px 5px ' + key.color}"
      @click="handleClickKey(key)"
    >
      <p>{{ key.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, useTemplateRef } from "vue";
import { useMessageDraft } from '@/hooks';
import { IKeyBoard } from "@/types";

defineProps({
  keyboard: {
    type: Array<IKeyBoard>,
    required: true,
  },
  align: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  }
});

const refKeyboard = useTemplateRef('keyboard')

const emit = defineEmits(['action'])

const chatAppId = inject('chatAppId')
const { setMessageText, setForceSendMessage } = useMessageDraft(chatAppId as string)

const handleClickKey = (key : IKeyBoard) => {
  if (key.action && typeof key.action === 'function') {
    (key.action as () => void)()
  } else if (key.action != null) {
    emit('action', key.action)
  } else {
    setMessageText(key.text)
    setForceSendMessage(true)
  }
}

defineExpose({
  refKeyboard
})

</script>

<style scoped lang="scss">
@use './styles/MessageKeyboard.scss';
</style>
