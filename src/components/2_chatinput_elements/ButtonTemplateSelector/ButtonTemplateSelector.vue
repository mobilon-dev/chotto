<template>
  <Tooltip
    text="Шаблоны сообщений"
    position="left"
  >
    <button
      v-if="!getMessage().isRecording"
      ref="templateButton"
      class="button-template"
      :class="{'button-template-disabled' : state == 'disabled'}"
      @click="toggle"
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <span class="">
        <ChatTemplatesIcon />
      </span>
    </button>
  </Tooltip>
  <transition>
    <div
      v-show="props.state === 'active'"
      ref="template"
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <TemplateSelector
        :templates="templates"
        :group-templates="groupTemplates"
        :elevated-window="elevatedWindow"
        :chat-background="chatBackground"
        @close-template-window="close"
      />
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { TemplateSelector, Tooltip } from '@/components';
import { useMessageDraft } from '@/hooks';
import { ChatTemplatesIcon } from './icons';

const props = defineProps({
  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  groupTemplates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  mode: {
    type: String,
    required: false,
    default: 'click'
  },
  state:{
    type: String,
    default: 'active',
  },
  elevatedWindow: {
    type: Boolean,
    required: false,
  },
  chatBackground: {
    type: String,
    default: undefined
  }
})

const chatAppId = inject('chatAppId')
const { getMessage } = useMessageDraft(chatAppId)

const templateButton = ref(null)
const template = ref(null)


const toggle = () => {
  if (props.mode == 'click' && props.state == 'active') {
    if (template.value.style.display == 'none') {
      template.value.style.display = 'inherit'
    }
    else if (template.value.style.display == 'inherit') {
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


</script>

<style
  scoped
  lang="scss"
>
@use './styles/ButtonTemplateSelector.scss';
</style>
