import { describe, expect, it } from 'vitest';
import { resolveRecentChannelSelection } from '../useCommunicationRecentSelection';
import type { ContactAttribute } from '../useCommunicationAttributes';

describe('resolveRecentChannelSelection', () => {
  const channels = [{ channelId: 'max.1', title: 'MAX' }];
  const getSingle = () => channels[0];
  const getAvailable = () => channels;

  const attrs: Record<string, ContactAttribute[]> = {
    max: [
      { id: 'atr_A', type: 'max', status: 'confirmed', value: '79001111111' },
      { id: 'atr_B', type: 'max', status: 'unconfirmed', value: '79002222222' },
    ],
  };

  it('one-clicks confirmed recent attribute even if a sibling is unconfirmed', () => {
    const resolved = resolveRecentChannelSelection(
      'max',
      { max: { channelId: 'max.1', attributeId: 'atr_A' } },
      attrs,
      getSingle,
      getAvailable,
    );
    expect(resolved?.attribute.id).toBe('atr_A');
    expect(resolved?.channelId).toBe('max.1');
  });

  it('does not one-click when recent attribute itself is unconfirmed', () => {
    const resolved = resolveRecentChannelSelection(
      'max',
      { max: { channelId: 'max.1', attributeId: 'atr_B' } },
      attrs,
      getSingle,
      getAvailable,
    );
    expect(resolved).toBeNull();
  });

  it('one-clicks sole attribute when it is confirmed and recent has no attributeId', () => {
    const sole: Record<string, ContactAttribute[]> = {
      max: [{ id: 'atr_A', type: 'max', status: 'confirmed', value: '79001111111' }],
    };
    const resolved = resolveRecentChannelSelection(
      'max',
      { max: { channelId: 'max.1' } },
      sole,
      getSingle,
      getAvailable,
    );
    expect(resolved?.attribute.id).toBe('atr_A');
  });
});
