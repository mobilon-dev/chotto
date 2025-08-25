<template>
  <button
    v-if="!getMessage().isRecording"
    ref="templateButton"
    class="button-template"
    :class="{ 'button-template-disabled': state == 'disabled' }"
    @click="toggle"
    @mouseover="hover"
    @mouseout="hoverout"
  >
    <span class="pi pi-code" />
  </button>

  <div ref="template" @mouseover="hover" @mouseout="hoverout">
    <WABATemplateSelector
      :waba-templates="wabaTemplates"
      :group-templates="groupTemplates"
      :elevated-window="elevatedWindow"
      @close-template-window="close"
      @send-waba-values="sendWabaValues"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted, provide, inject } from 'vue'
  import { WABATemplateSelector } from '../WABATemplateSelector'
  import { useMessage } from '../../../helpers'

  const props = defineProps({
    wabaTemplates: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
    groupTemplates: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
    mode: {
      type: String,
      required: false,
      default: 'click',
    },
    state: {
      type: String,
      default: 'active',
    },
    filebumpUrl: {
      type: String,
      default: 'https://filebump2.services.mobilon.ru',
    },
    elevatedWindow: {
      type: Boolean,
      required: false,
    },
  })

  provide('filebumpUrl', props.filebumpUrl)

  const chatAppId = inject('chatAppId')
  const { getMessage } = useMessage(chatAppId)

  const templateButton = ref(null)
  const template = ref(null)
  const emit = defineEmits(['sendWabaValues'])

  const toggle = () => {
    if (props.mode == 'click' && props.state == 'active') {
      if (template.value.style.display == 'none') {
        template.value.style.display = 'inherit'
      } else if (template.value.style.display == 'inherit') {
        template.value.style.display = 'none'
      }
    }
  }

  const hover = () => {
    if (props.mode == 'hover' && props.state == 'active') {
      template.value.style.display = 'inherit'
    }
  }

  const hoverout = () => {
    if (props.mode == 'hover' && props.state == 'active') {
      template.value.style.display = 'none'
    }
  }

  const close = () => {
    template.value.style.display = 'none'
  }

  onMounted(() => {
    template.value.style.display = 'none'
  })

  const sendWabaValues = (obj) => {
    emit('sendWabaValues', obj)
  }
</script>

<style scoped lang="scss">
  .button-template {
    background-color: transparent;
    border: 0px;
    height: fit-content;
    span {
      display: block;
      cursor: pointer;
      padding: var(--chotto-chat-input-button-padding);
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-button-color-active);
    }
  }

  .button-template:hover span {
    color: var(--chotto-button-color-hover);
  }

  .button-template-disabled {
    pointer-events: none;
    span {
      cursor: auto;
      color: var(--chotto-button-color-disabled);
    }
  }
</style>
