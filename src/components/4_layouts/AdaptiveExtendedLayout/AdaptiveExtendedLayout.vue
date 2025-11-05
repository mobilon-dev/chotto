<template>
  <div
    :id="'extern-layout-container-' + chatAppId"
    ref="refContainer"
    class="extend-layout__container"
  >
    <div 
      :id="'extend-layout-first-col-' + chatAppId" 
      class="extend-layout__first-col"
    >
      <slot name="first-col" />
    </div>
    <div
      :id="'extend-layout-second-col-' + chatAppId"
      class="extend-layout__second-col"
    >
      <slot name="second-col" />
    </div>
    <div 
      :id="'extend-layout-third-col-' + chatAppId"
      class="extend-layout__third-col"
    >
      <slot name="third-col" />
    </div>
  </div>
</template>

<script setup>
import { inject, watch, onMounted } from 'vue';

const props = defineProps({
  isSecondColVisible:{
    type: Boolean,
    required: true
  },
  isThirdColVisible:{
    type: Boolean,
    required: true
  }
})

watch(
  () => [props.isSecondColVisible, props.isThirdColVisible],
  () => {
    if (props.isSecondColVisible) setSecondColVisible()
    if (props.isThirdColVisible) setThirdColVisible()
  },
  { immediate: true }
)

const chatAppId = inject('chatAppId')

const setThirdColVisible = () => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)

  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-display','none')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-display','flex')
  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-width','0%')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-width','100%')
}

const setSecondColVisible = () => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)

  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-display','flex')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-display','none')
  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-width','100%')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-width','0%')
}

onMounted(() => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)
  const firstCol = document.getElementById('extend-layout-first-col-' + chatAppId)
  
  container.style.setProperty('--chotto-adaptive-extended-layout-first-col-width',firstCol.offsetWidth + 'px')
})

</script>

<style scoped lang="scss">
@use './styles/AdaptiveExtendedLayout.scss';
</style>
