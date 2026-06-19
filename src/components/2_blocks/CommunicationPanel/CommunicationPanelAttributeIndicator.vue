<template>
  <span class="attribute-indicator-slot">
    <template v-if="showSlot">
      <Tooltip
        v-if="tooltipText"
        :text="tooltipText"
        position="bottom-left"
        :offset="8"
        :delay="tooltipDelay"
        hide-on-click
      >
        <span :class="indicatorClass">
          <CommunicationPanelConfirmSpinner v-if="showSpinner" />
          <CommunicationPanelCheckIcon v-else-if="showCheckmark" />
          <span
            v-else-if="showBlockedSlot"
            class="blocked-indicator-mark"
            aria-hidden="true"
          />
        </span>
      </Tooltip>
      <span
        v-else
        :class="indicatorClass"
      >
        <CommunicationPanelConfirmSpinner v-if="showSpinner" />
        <CommunicationPanelCheckIcon v-else-if="showCheckmark" />
        <span
          v-else-if="showBlockedSlot"
          class="blocked-indicator-mark"
          aria-hidden="true"
        />
      </span>
    </template>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import Tooltip from '@/components/1_atoms/Tooltip/Tooltip.vue';
import { CommunicationPanelCheckIcon, CommunicationPanelConfirmSpinner } from './icons';
import {
  shouldShowAttributeCheckmark,
  getAttributeCheckIndicatorClass,
  isAttributeConfirming,
  shouldShowBlockedIndicatorSlot,
  getAttributeIndicatorTooltipText,
} from './composables/useCommunicationAttributes';

const props = defineProps({
  attribute: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: false,
    default: false,
  },
  confirmingAttributeId: {
    type: String,
    required: false,
    default: null,
  },
  blockedAttributeIds: {
    type: Array,
    required: false,
    default: () => [],
  },
  indicatorTooltips: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  tooltipDelay: {
    type: Number,
    required: false,
    default: 600,
  },
});

const indicatorContext = computed(() => ({
  isSelected: props.isSelected,
  confirmingAttributeId: props.confirmingAttributeId,
  blockedAttributeIds: props.blockedAttributeIds ?? [],
}));

const showSpinner = computed(() =>
  isAttributeConfirming(props.attribute, props.confirmingAttributeId)
);

const showCheckmark = computed(() =>
  shouldShowAttributeCheckmark(props.attribute, props.isSelected)
);

const showBlockedSlot = computed(() =>
  shouldShowBlockedIndicatorSlot(props.attribute, indicatorContext.value)
);

const showIndicator = computed(() => showSpinner.value || showCheckmark.value);

const showSlot = computed(() => showIndicator.value || showBlockedSlot.value);

const indicatorClass = computed(() => {
  if (showSpinner.value) {
    return 'confirming-indicator';
  }
  if (showBlockedSlot.value) {
    return 'blocked-indicator';
  }
  return getAttributeCheckIndicatorClass(props.attribute, props.isSelected) ?? '';
});

const tooltipText = computed(() =>
  getAttributeIndicatorTooltipText(
    props.attribute,
    props.indicatorTooltips,
    indicatorContext.value
  )
);
</script>
