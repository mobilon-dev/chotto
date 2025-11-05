<template>
  <div class="contact-info">
    <div class="contact-info__attribute-list">
      <div
        v-for="(attr, index) in contact?.attributes || []"
        :key="attr.id"
        class="contact-info__attribute-item"
        :class="{ 'contact-info__attribute-item--current-chat': isCurrentChat(attr) }"
      >
        <input
          :id="`attr-${index}`"
          v-model="localSelectedAttributeId"
          type="radio"
          :value="attr.id"
          @change="onAttributeSelected(attr)"
        >

        <label :for="`attr-${index}`">
          <span class="contact-info__custom-radio">
            <span class="contact-info__radio-inner">
              <CheckIcon
                v-if="localSelectedAttributeId === attr.id"
              />
            </span>
          </span>

          {{ attr.value }}
          <span
            v-if="isCurrentChat(attr)"
            class="contact-info__badge"
          >
            Текущий чат
          </span>
        </label>
      </div>
    </div>

    <div class="contact-info__channel-section">
      <label class="contact-info__channel-label">Канал связи</label>
      <div class="contact-info__custom-select">
        <div
          class="contact-info__select-trigger"
          @click="isOpen = !isOpen"
        >
          <div class="contact-info__icon">
            <img
              v-if="currentChannel?.icon"
              :src="currentChannel.icon"
              :alt="currentChannel.title"
              width="22"
              height="22"
            >
            <component
              :is="getChannelComponent(currentChannel?.channelId)"
              v-else
              class="contact-info__icon-component"
            />
          </div>
          <span>{{ currentChannel?.title }}</span>
          <div
            class="contact-info__arrow"
            :class="{ 'contact-info__arrow--open': isOpen }"
          />
        </div>

        <div
          v-if="isOpen"
          class="contact-info__select-options"
        >
          <div
            v-for="channel in availableChannels"
            :key="channel.channelId"
            class="contact-info__select-option"
            @click="selectChannel(channel)"
          >
            <div class="contact-info__icon">
              <img
                v-if="channel.icon"
                :src="channel.icon"
                :alt="channel.title"
                width="22"
                height="22"
              >
              <component
                :is="getChannelComponent(channel.channelId)"
                v-else
                class="contact-info__icon-component"
              />
            </div>
            <span>{{ channel.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-info__divider" />

    <div class="contact-info__crm-button">
      <button
        class="contact-info__button"
        @click="$emit('open-crm')"
      >
        <ContactCRMIcon />
        Открыть контакт в CRM
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { ContactCRMIcon, CheckIcon, WhatsAppIcon, TelegramIcon } from '@/components';

const props = defineProps({
  contact: {
    type: Object,
    required: false,
    default: () => ({ attributes: [] })
  },
  currentDialog: {
    type: Object,
    default: () => ({}),
  },
  channels: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['close', 'open-crm', 'select-attribute-channel']);

const localSelectedAttributeId = ref(props.contact?.attributes?.[0]?.id || '');
const localSelectedChannel = ref(props.channels[0] || null);
const isOpen = ref(false);

const selectChannel = (channel) => {
  localSelectedChannel.value = channel;
  isOpen.value = false;
  console.log(`Выбран канал связи: ${channel.title}`);
  emit('select-attribute-channel', {
    attributeId: localSelectedAttributeId.value,
    channelId: channel.channelId
  });
};

const extractPhone = (value) => value?.replace(/\D/g, '') || '';

const selectedAttribute = computed(() => {
  return props.contact?.attributes?.find(attr => attr.id === localSelectedAttributeId.value);
});

const currentChannel = computed(() => {
  if (localSelectedChannel.value) {
    return localSelectedChannel.value;
  }

  if (!selectedAttribute.value) return props.channels[0] || null;
  const phone = extractPhone(selectedAttribute.value.value);
  if (!phone) return props.channels[0] || null;

  const found = props.channels.find(ch => {
    const channelTitle = ch.title?.toLowerCase() || '';
    const channelValue = ch.channelId?.toLowerCase() || '';
    const hasPhone = channelTitle.includes(phone);
    const isRelevant = ['whatsapp', 'waba', 'telegram'].some(type => channelValue.includes(type));
    return hasPhone && isRelevant;
  });

  return found || props.channels[0] || { title: 'default', channelId: 'fallback' };
});

const availableChannels = computed(() => {
  return props.channels;
});

const getChannelComponent = (channelId) => {
  if (!channelId) return null;
  if (channelId.includes('whatsapp') || channelId.includes('waba')) return WhatsAppIcon;
  if (channelId.includes('telegram')) return TelegramIcon;
  return null;
};

const isCurrentChat = (attr) => {
  if (!props.currentDialog || !Object.keys(props.currentDialog)) return false;
  return props.currentDialog.attributeId === attr.id;
};

const onAttributeSelected = (attr) => {
  emit('select-attribute-channel', {
    attributeId: attr.id,
    channelId: localSelectedChannel.value.channelId
  });
};

watch(
  () => props.contact,
  () => {
    if (props.contact?.attributes?.length) {
      if (!localSelectedAttributeId.value) {
        localSelectedAttributeId.value = props.contact.attributes[0].id;
      } else if (!props.contact.attributes.some(a => a.id === localSelectedAttributeId.value)) {
        localSelectedAttributeId.value = props.contact.attributes[0].id;
      }
    } else {
      localSelectedAttributeId.value = '';
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@use './styles/ContactInfo.scss';
</style>