<template>
  <div class="reply-text-message__wrapper">
    <Tooltip
      v-if="tooltipText"
      position="top"
      :offset="8"
      :delay="1000"
      max-width="25rem"
      :text="tooltipText"
    >
      <div
        class="container"
        @click="onQuoteClick"
      >
        <p
          v-if="message.header"
          v-text="`В ответ ${message.header}`"
        />
        <p
          class="text"
          v-html="linkedHtml"
        />
      </div>
    </Tooltip>
    <div
      v-else
      class="container"
      @click="onQuoteClick"
    >
      <p
        v-if="message.header"
        v-text="`В ответ ${message.header}`"
      />
      <p
        class="text"
        v-html="linkedHtml"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { useMessageLinks } from '@/hooks/messages';
import { ITextMessage } from '@/types';

const props = defineProps({
  message: {
    type: Object as () => ITextMessage,
    required: true,
  },
});

const { linkedHtml } = useMessageLinks(() => props.message.text)
const tooltipText = computed(() => props.message.text?.trim() || '')

const onQuoteClick = (event: Event) => {
  const anchor = (event.target as HTMLElement | null)?.closest('a');

  if (anchor instanceof HTMLAnchorElement && anchor.href) {
    event.preventDefault();
    event.stopPropagation();
    window.open(anchor.href, '_blank', 'noopener,noreferrer');
  }
}

</script>

<style scoped lang="scss">
@use './styles/ReplyTextMessage.scss';

.reply-text-message__wrapper {
  width: 100%;
  min-width: 0;
  max-width: 100%;

  :deep(.tooltip-wrapper) {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }
}
</style>
