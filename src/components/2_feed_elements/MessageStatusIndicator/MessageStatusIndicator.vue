<template>
  <Tooltip
    v-if="isVisible"
    :text="statusTitle"
    :position="tooltipPosition"
  >
    <div :class="['message-status-indicator', ...statusContainerClasses]">
      <PendingStatusIcon
        v-if="messageStatus === 'pending'"
      />
      <ErrorStatusIcon
        v-else-if="messageStatus === 'error'"
      />
      <ReadStatusIcon
        v-else-if="messageStatus === 'read'"
      />
      <ReceivedStatusIcon
        v-else-if="messageStatus === 'received'"
      />
      <SentStatusIcon
        v-else
      />
    </div>
  </Tooltip>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { statuses as defaultStatuses } from '@/functions';
import {
  ErrorStatusIcon,
  PendingStatusIcon,
  ReadStatusIcon,
  ReceivedStatusIcon,
  SentStatusIcon,
} from './icons';

defineOptions({
  name: 'MessageStatusIndicator',
});

const props = defineProps({
  baseClass: {
    type: String,
    required: true,
  },
  messageStatus: {
    type: String,
    required: true,
  },
  statusClass: {
    type: String,
    default: '',
  },
  statusTitle: {
    type: String,
    default: '',
  },
  messageClass: {
    type: String,
    required: true,
  },
  tooltipPosition: {
    type: String,
    default: 'bottom-left',
  },
  statuses: {
    type: Array as () => string[],
    default: () => defaultStatuses,
  },
});

const isVisible = computed(() => {
  return props.messageClass === `${props.baseClass}__right` && props.statuses.includes(props.messageStatus);
});

const statusContainerClasses = computed(() => {
  const classes = [`${props.baseClass}__status`];
  if (props.statusClass) {
    classes.push(props.statusClass);
  }
  return classes;
});
</script>

<style scoped lang="scss">
@use './styles/MessageStatusIndicator.scss';
</style>
