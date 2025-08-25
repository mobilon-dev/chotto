<template>
  <transition>
    <div class="feed-search__container">
      <span style="line-height: 40px">{{ t('component.FeedSearch.SearchLabel') }}</span>
      <input
        ref="refInput"
        v-model="getModel().text"
        class="feed-search__input"
        type="text"
        :placeholder="t('component.FeedSearch.SearchPlaceholder')"
      />
      <i class="pi pi-times" :style="{ right: resetLoc }" @click="clearInput" />
      <span
        v-if="isFeedLocation"
        class="pi pi-refresh"
        style="margin-left: 5px; margin-top: 10px; cursor: pointer"
        @click="emit('switch')"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { ref, unref, onMounted, watch, computed, inject } from 'vue'
  import { t } from '../../../locale'
  import { useSearchModel } from '../../../helpers/useSearchModel'
  import useDelayDebouncedRef from '../../../helpers/useDelayDebouncedRef'

  const chatAppId = inject('chatAppId')
  const { getModel } = useSearchModel(chatAppId as string)

  const emit = defineEmits(['search', 'cancel', 'switch'])

  const props = defineProps({
    isFeedLocation: {
      type: Boolean,
      default: false,
    },
  })

  const refInput = ref<HTMLInputElement>()
  const search = useDelayDebouncedRef('', 500)

  const resetLoc = computed(() => {
    if (props.isFeedLocation) return '40px'
    if (!props.isFeedLocation) return '20px'
    return '20px'
  })

  watch(
    () => [getModel().text, search.value],
    () => {
      if (search.value == getModel().text) emit('search', getModel().text)
      else search.value = getModel().text
    }
  )

  const clearInput = () => {
    const el = unref(refInput)
    if (el) el.value = ''
    getModel().text = ''
    emit('cancel')
  }

  onMounted(() => {
    const el = unref(refInput)
    el?.focus()
  })
</script>

<style scoped lang="scss">
  .feed-search {
    &__container {
      display: flex;
      position: relative;
      margin-top: 10px;
      padding-left: 12px;
      padding-right: 12px;
      margin-bottom: 10px;

      i {
        position: absolute;
        right: 20px;
        top: 11px;
      }

      i:hover {
        cursor: pointer;
      }
    }

    &__input {
      width: 100%;
      background-color: var(--chotto-input-background);
      color: var(--chotto-primary-text-color);
      padding: var(--chotto-input-padding);
      border: var(--chotto-input-border);
      border-radius: var(--chotto-input-border-radius);
      font-size: var(--chotto-input-font-size);
      transition: border-color var(--chotto-input-transition-duration);
      margin-left: 10px;
      &::placeholder {
        color: var(--chotto-secondary-text-color);
      }

      &:hover {
        border-color: var(--chotto-input-hover-border-color);
      }

      &:focus-visible {
        border-color: var(--chotto-input-focus-border-color);
        outline: none;
      }
    }
  }

  .v-enter-active {
    transition: all 2s ease-out;
  }

  .v-leave-active {
    transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .v-enter-from,
  .v-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }
</style>
