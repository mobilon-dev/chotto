<template>
  <Tooltip
    v-if="isVisible"
    :text="statusTitle"
    :position="tooltipPosition"
  >
    <div :class="statusContainerClasses">
      <template v-if="messageStatus === 'pending'">
        <span class="pi pi-clock" />
      </template>
      <template v-else-if="messageStatus === 'error'">
        <span class="pi pi-times-circle" />
      </template>
      <template v-else>
        <span
          v-if="messageStatus !== 'sent'"
          class="pi pi-check"
        />
        <span class="pi pi-check" />
      </template>
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

