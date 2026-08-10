<template>
  <Tooltip
    v-if="hasTooltip"
    position="bottom-right"
    :offset="8"
    :delay="400"
    max-width="280px"
    :bubble-style="tooltipBubbleStyle"
  >
    <template #content>
      <div class="deleted-message-content__tooltip">
        <div
          v-if="originalText"
          class="deleted-message-content__tooltip-original"
        >
          {{ originalText }}
        </div>
        <div
          v-if="meta"
          class="deleted-message-content__tooltip-meta"
        >
          {{ meta }}
        </div>
      </div>
    </template>
    <div class="deleted-message-content">
      <DeletedMessageIcon class="deleted-message-content__icon" />
      <span class="deleted-message-content__text">
        {{ label }}
      </span>
    </div>
  </Tooltip>
  <div
    v-else
    class="deleted-message-content"
  >
    <DeletedMessageIcon class="deleted-message-content__icon" />
    <span class="deleted-message-content__text">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/locale/useLocale'
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue'
import DeletedMessageIcon from './icons/DeletedMessageIcon.vue'

const props = defineProps({
  /** Оригинальный текст удалённого сообщения */
  originalText: {
    type: String,
    required: false,
    default: '',
  },
  /** Строка мета: «Имя, дата в время» */
  meta: {
    type: String,
    required: false,
    default: '',
  },
})

const { t } = useLocale()

const label = computed(() => t('component.DeletedMessageContent.text'))
const hasTooltip = computed(() => !!(props.originalText || props.meta))
const tooltipBubbleStyle = {
  '--chotto-tooltip-border': '1px solid #5F5F5F',
}
</script>

<style scoped lang="scss">
@use './styles/DeletedMessageContent.scss';
</style>
