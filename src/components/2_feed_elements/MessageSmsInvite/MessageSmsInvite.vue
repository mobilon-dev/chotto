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
import { computed } from 'vue';

import { useLocale } from '@/locale/useLocale';

const props = defineProps<{
  status: string | undefined;
  hasMessengerAccount?: boolean;
  channel?: string | undefined;
}>();

const emit = defineEmits<{
  (e: 'sms-invite'): void;
}>();

const { t } = useLocale();

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

const handleClick = () => {
  emit('sms-invite');
};
</script>

<style scoped lang="scss">
@use './styles/MessageSmsInvite.scss';
</style>


