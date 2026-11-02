import { describe, expect, it, vi } from 'vitest';
import { computed, ref } from 'vue';
import { useCommunicationActions } from '../useCommunicationActions';
import type { ContactAttribute } from '../useCommunicationAttributes';

function createActions(options: {
  hasMultiplePhoneChannels: boolean;
  emit: ReturnType<typeof vi.fn>;
}) {
  const activeChannelType = ref<string | null>('phone');
  const channels = computed(() =>
    options.hasMultiplePhoneChannels
      ? [
          { channelId: 'phone.1', title: 'Line 1' },
          { channelId: 'phone.2', title: 'Line 2' },
        ]
      : [{ channelId: 'phone.1', title: 'Line 1' }],
  );

  return useCommunicationActions({
    activeChannelType,
    channels,
    selectedChannel: ref({}),
    selectedChannelType: ref(null),
    hoveredAttribute: ref(null),
    confirmingAttributeId: ref(null),
    isAttributeBlocked: () => false,
    closeMenu: vi.fn(),
    pinMenuOpen: vi.fn(),
    hasMultipleChannels: (type) => type === 'phone' && options.hasMultiplePhoneChannels,
    getSingleChannelForType: (type) =>
      type === 'phone' && !options.hasMultiplePhoneChannels ? channels.value[0] : null,
    getAvailableChannels: (type) => (type === 'phone' ? channels.value : []),
    isChannelEmpty: () => false,
    isNewDialog: computed(() => false),
    showDefaultChannelTooltipWithTimer: vi.fn(),
    clearDefaultChannelTooltip: vi.fn(),
    emit: options.emit as any,
  });
}

describe('useCommunicationActions phone attribute click', () => {
  const attribute: ContactAttribute = {
    id: 'phone.atr_1',
    type: 'phone',
    status: 'confirmed',
    value: '79001111111',
    data: '79001111111',
  };

  it('emits phone-call when only one voice channel is available', () => {
    const emit = vi.fn();
    const { handleAttributeClick } = createActions({
      hasMultiplePhoneChannels: false,
      emit,
    });

    handleAttributeClick(attribute);

    expect(emit).toHaveBeenCalledWith('phone-call', {
      attributeId: 'phone.atr_1',
      phoneNumber: '79001111111',
    });
  });

  it('does not emit phone-call when two or more voice channels are available', () => {
    const emit = vi.fn();
    const { handleAttributeClick } = createActions({
      hasMultiplePhoneChannels: true,
      emit,
    });

    handleAttributeClick(attribute);

    expect(emit).not.toHaveBeenCalled();
  });

  it('emits select-attribute-channel from submenu selection with multiple voice channels', () => {
    const emit = vi.fn();
    const hoveredAttribute = ref<ContactAttribute | null>(attribute);
    const activeChannelType = ref<string | null>('phone');
    const channels = computed(() => [
      { channelId: 'phone.1', title: 'Line 1' },
      { channelId: 'phone.2', title: 'Line 2' },
    ]);

    const { selectChannel } = useCommunicationActions({
      activeChannelType,
      channels,
      selectedChannel: ref({}),
      selectedChannelType: ref(null),
      hoveredAttribute,
      confirmingAttributeId: ref(null),
      isAttributeBlocked: () => false,
      closeMenu: vi.fn(),
      pinMenuOpen: vi.fn(),
      hasMultipleChannels: () => true,
      getSingleChannelForType: () => null,
      getAvailableChannels: () => channels.value,
      isChannelEmpty: () => false,
      isNewDialog: computed(() => false),
      showDefaultChannelTooltipWithTimer: vi.fn(),
      clearDefaultChannelTooltip: vi.fn(),
      emit: emit as any,
    });

    selectChannel('phone.2');

    expect(emit).toHaveBeenCalledWith('select-attribute-channel', {
      attributeId: 'phone.atr_1',
      channelId: 'phone.2',
    });
  });
});
