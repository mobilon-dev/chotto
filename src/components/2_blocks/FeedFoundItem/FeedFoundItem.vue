<template>
  <div 
    class="feed-found-item__container"
    :class="{'feed-found-item__selected-container' : selected}"
  >
    <div class="feed-found-item__avatar-container">
      <img
        v-if="object.avatar"
        :src="object.avatar"
        width="48"
        height="48"
      >
      <span
        v-else
        class="pi pi-user"
      />
    </div>
    <div class="feed-found-item__info">
      <div class="feed-found-item__first-line">
        <p class="feed-found-item__name">
          {{ object.subtext }}
        </p>
        <p class="feed-found-item__time">
          {{ object.time }}
        </p>
      </div>
      <div class="feed-found-item__second-line">
        <img
          v-if="object.type == 'message.image'"
          :src="object.url"
          style="margin-right: 3px;"
          width="24"
          height="24"
        >
        <span
          v-if="typePreview"
          :class="typePreview"
          style="
            margin-right: 3px;
            font-size: 20px;
          "
        />
        <p> {{ object.text }} </p>
      </div>
    </div>   
  </div>   
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IFeedObject } from '@/types';
const props = defineProps({
  object: {
    type: Object as () => IFeedObject,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  }
});

const typePreview = computed(() => {
  const r: Record<string, string> = {
    'message.file': 'pi pi-file',
    'message.audio': 'pi pi-volume-up',
    'message.video': 'pi pi-video',
    'message.call': 'pi pi-phone',
  };
  return r[props.object.type] || null
})

</script>

<style scoped lang="scss">
@use './styles/FeedFoundItem.scss';
</style>
