<template>
  <h3 style="padding-left: 12px">
    {{ t('component.FeedFoundObjects.results') }}: {{ foundAmount }}
  </h3>
  <div
    v-if="foundAmount > 0"
    ref="refItems"
    class="feed-found-objects__items"
    @scroll="scrollTopCheck"
  >
    <div v-for="object in objects" :key="object.messageId" @click="clickObject(object)">
      <FeedFoundItem :object="object" :selected="object == selectedItem" />
    </div>
  </div>
  <div v-else-if="foundAmount == 0" class="feed-found-objects__placeholder">
    <p>{{ placeholder }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, unref, computed } from 'vue'
  import { t } from '../../../locale'
  import { FeedFoundItem } from '../FeedFoundItem'
  import { IFeedObject } from '../../../types'

  const emit = defineEmits(['clickedSearch', 'loadMore'])

  const props = defineProps({
    objects: {
      type: Array<IFeedObject>,
      required: true,
    },
    foundAmount: {
      type: Number,
      default: 0,
    },
    notFound: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const refItems = ref()
  const selectedItem = ref(null)

  const placeholder = computed(() => {
    if (props.notFound) return t('component.FeedFoundObjects.notFound')
    if (!props.notFound) return t('component.FeedFoundObjects.notSearched')
    return ''
  })

  const clickObject = (object) => {
    if (object.messageId) {
      emit('clickedSearch', object.messageId)
      selectedItem.value = object
    }
  }

  const scrollTopCheck = () => {
    const element = unref(refItems)
    const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight

    if (scrollBottom <= 0) {
      emit('loadMore')
    }
  }
</script>

<style scoped lang="scss">
  .feed-found-objects {
    &__items {
      display: flex;
      flex-direction: column;
      scroll-behavior: smooth;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      &::-webkit-scrollbar {
        width: 6px;
        background-color: var(--chotto-scrollbar-bg);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--chotto-scrollbar-thumb-bg);
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }
    }

    &__placeholder {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        text-align: center;
      }
    }
  }
</style>
