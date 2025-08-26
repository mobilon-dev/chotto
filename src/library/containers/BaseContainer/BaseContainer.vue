<template>
  <div
    :id="chatAppId"
    class="base"
  >
    <div
      class="base__container"
      :style="{ height, width }"
    >
      <slot name="default" />
    </div>
  </div>
</template>

<script setup>
import { useId, provide } from 'vue'
// import { onMounted } from 'vue'

const props = defineProps({
  height: {
    type: String,
    default: '100%'
  },
  width: {
    type: String,
    default: '100%'
  },
  extChatAppId: {
    type: String,
    default: ''
  }
})

const chatAppId = useId()
provide('chatAppId', chatAppId)
provide('extChatAppId', props.extChatAppId ? props.extChatAppId : '')

</script>
