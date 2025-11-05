<template>
  <transition>
    <div class="feed-search__container">
      <span style="line-height: 40px;">{{ t('component.FeedSearch.SearchLabel') }}</span>
      <input
        ref="refInput"
        v-model="getModel().text"
        class="feed-search__input"
        type="text"
        :placeholder="t('component.FeedSearch.SearchPlaceholder')"
      >
      <i 
        class="pi pi-times" 
        :style="{right: resetLoc}"
        @click="clearInput"
      />
      <span 
        v-if="isFeedLocation" 
        class="pi pi-refresh"
        style="margin-left: 5px; margin-top: 10px; cursor: pointer;"
        @click="emit('switch')"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, unref, onMounted, watch, computed, inject } from 'vue';
import { t } from '../../../locale/useLocale';
import { useSearchModel, useDelayDebouncedRef } from '@/hooks';

const chatAppId = inject('chatAppId')
const { getModel } = useSearchModel(chatAppId as string)

const emit = defineEmits(['search', 'cancel', 'switch'])

const props = defineProps({
  isFeedLocation: {
    type: Boolean,
    default: false
  }
})

const refInput = ref<HTMLInputElement>();
const search = useDelayDebouncedRef('', 500)

const resetLoc = computed(() => {
  if (props.isFeedLocation) return '40px'
  if (!props.isFeedLocation) return '20px'
  return '20px'
})

watch(
  () => [getModel().text, search.value],
  () => {
    if (search.value == getModel().text)
      emit('search', getModel().text);
    else
      search.value = getModel().text
  }
)

const clearInput = () => {
  const el = unref(refInput);
  if (el)
    el.value = ''
  getModel().text = ''
  emit('cancel')
}

onMounted(() => {
  const el = unref(refInput);
  el?.focus()
})

</script>

<style scoped lang="scss">
@use './styles/FeedSearch.scss';
</style>
