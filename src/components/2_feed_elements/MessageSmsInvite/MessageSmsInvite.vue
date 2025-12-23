<template>
  <div
    v-if="isVisible"
    class="message-sms-invite"
    :data-channel-type="channelType"
    @click="handleClick"
  >
    <span class="message-sms-invite__text">
      {{ t('component.TextMessage.sendSmsInvite') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

import { useLocale } from '@/locale/useLocale';
import { useMessageDraft } from '@/hooks';

const props = defineProps<{
  status: string | undefined;
  hasMessengerAccount?: boolean;
  channel?: string | undefined;
}>();

const emit = defineEmits<{
  (e: 'sms-invite'): void;
}>();

const { t } = useLocale();

const chatAppId = inject('chatAppId') as string | undefined;
const selectedChat = inject('selectedChat') as { value?: { contact?: { attributes?: unknown[] } } } | undefined;

const { setMessageText } = useMessageDraft(chatAppId || '');

const isVisible = computed(() => {
  return props.status === 'error' && props.hasMessengerAccount === false;
});

const channelType = computed<'telegram' | 'whatsapp' | 'max'>(() => {
  const id = props.channel?.toLowerCase() ?? '';

  if (id.includes('whatsapp') || id.includes('waba')) {
    return 'whatsapp';
  }

  if (id.includes('max')) {
    return 'max';
  }

  // по умолчанию считаем, что это Telegram или неизвестный канал
  return 'telegram';
});


const inviteText = computed(() => {
  const chat = selectedChat && selectedChat.value ? selectedChat.value : null;
  if (!chat || !chat.contact || !chat.contact.attributes) return null;

  type ContactAttribute = { type?: string; data?: unknown; value?: unknown };
  const attributes = chat.contact.attributes as ContactAttribute[];

  const normalizePhone = (raw: unknown) => {
    if (!raw) return null;

    if (typeof raw === 'string') {
      return raw.startsWith('+') ? raw : `+${raw}`;
    }

    if (typeof raw === 'object') {
      const obj = raw as { phone?: string };
      if (obj.phone) {
        return obj.phone.startsWith('+') ? obj.phone : `+${obj.phone}`;
      }
    }

    return null;
  };

  let phoneForLink: string | null = null;

  if (channelType.value === 'whatsapp') {
    const attr = attributes.find(a => a.type === 'whatsapp' || a.type === 'waba');
    phoneForLink = normalizePhone(attr?.data ?? attr?.value);
  } else if (channelType.value === 'telegram') {
    const attr = attributes.find(a => a.type === 'telegram');
    phoneForLink = normalizePhone(attr?.data ?? attr?.value);
  } else if (channelType.value === 'max') {
    const attr = attributes.find(a => a.type === 'max');
    phoneForLink = normalizePhone(attr?.data ?? attr?.value);
  }

  if (!phoneForLink) {
    return null;
  }

  if (channelType.value === 'whatsapp') {
    const phoneDigits = phoneForLink.replace('+', '');
    return `Перейдите в WhatsApp https://wa.me/+${phoneDigits}, чтобы продолжить общение`;
  }

  if (channelType.value === 'telegram') {
    const phoneDigits = phoneForLink.replace('+', '');
    return `Перейдите в Telegram https://t.me/+${phoneDigits}, чтобы продолжить общение`;
  }

  if (channelType.value === 'max') {
    return `Перейдите в Max https://max.ru/ и найдите нас по номеру ${phoneForLink}, чтобы продолжить общение`;
  }

  return null;
});

const handleClick = () => {
  if (inviteText.value && setMessageText) {
    setMessageText(inviteText.value);
  }
  emit('sms-invite');
};
</script>

<style scoped lang="scss">
@use './styles/MessageSmsInvite.scss';

.message-sms-invite {
  &[data-channel-type="telegram"] .message-sms-invite__text {
    color: var(--chotto-messagesmsinvite-text-color-telegram);
    border-top-color: var(--chotto-messagesmsinvite-text-border-top-color-telegram);
  }

  &[data-channel-type="whatsapp"] .message-sms-invite__text {
    color: var(--chotto-messagesmsinvite-text-color-whatsapp);
    border-top-color: var(--chotto-messagesmsinvite-text-border-top-color-whatsapp);
  }

  &[data-channel-type="max"] .message-sms-invite__text {
    color: var(--chotto-messagesmsinvite-text-color-max);
    border-top-color: var(--chotto-messagesmsinvite-text-border-top-color-max);
  }
}
</style>


