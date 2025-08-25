<template>
  <span
    :id="'placeholder' + chatAppId + index"
    ref="refPlaceholder"
    contenteditable
    :class="{ 'filled': isFilled, 'empty': !isFilled }"
    class="placeholder"
    @keydown.enter="handleEnter"
    @focus="prepare"
    @blur="validate"
  >
    {{ v }}
  </span>
</template>

<script setup>
import {  onMounted, onUnmounted, ref, inject, nextTick, watch } from 'vue';

const chatAppId = inject('chatAppId')

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  isFilled: {
    type: Boolean,
    required: true
  },
});

const emit = defineEmits(['edit'])

const v = ref(props.value)
const refPlaceholder = ref()

watch(
  () => props.isFilled,
  () => { if (!props.isFilled) v.value = 'Заполнить'},
  {immediate: true}
)

const prepare = (event) => {
  if (!props.isFilled) {
    v.value = ''
    const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.selectNodeContents(event.target);     
      }
  }
}

function validate() {
  v.value = refPlaceholder.value.innerText.trim()
  if (props.value != v.value){
    if (v.value != ''){
      emit('edit',[v.value, props.index])
    }
    else {
      if (!props.isFilled) v.value = 'Заполнить'
      else {
        nextTick(() => {
          v.value = props.value
        }) 
      }
    }
  }
}

function handleEnter(event) {
  event.target.blur()
  validate()
}

function handleKey(event) {
  if (event.target == document.getElementById('placeholder' + chatAppId + props.index)){
    if (event.key === "Escape") {
      event.target.blur()
    }
    if (event.key == 'Tab'){
      event.target.blur()
      if (document.getElementById('placeholder' + chatAppId + (props.index + 1))){
        event.preventDefault()
        document.getElementById('placeholder' + chatAppId + (props.index + 1)).focus()
      }
    }
  }
  
}

onMounted(() => {
  window.addEventListener("keydown", handleKey);
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKey);
})
</script>

<style scoped>
.placeholder {
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 1.8;
}

.placeholder.filled {
  background-color: var(--chotto-variable-placeholder-filled-color);
}

.placeholder.empty {
  background-color: var(--chotto-variable-placeholder-empty-color);
}
</style>
