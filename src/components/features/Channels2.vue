<template>
  <div
    ref="customDiv"
    class="channels"
  >
    <div class="channels__container">
      <button
        class="channels__button"
        @click="toggle"
      >
        <span class="pi pi-list" />
      </button>

      <div class="channels__title-container">
        <div
          v-if="selectedChannel"
          class="channels__selected"
        >
          <span
            v-if="selectedChannel.icon"
            class="channels__icon"
          >
            <img :src="selectedChannel.icon">
          </span>
          <span class="channels__title">{{ selectedChannel.title }}</span>
        </div>
        <span
          v-else
          class="channels__title"
        >Чат не выбран</span>
      </div>

      <Transition>
        <div
          v-if="showPopup"
          class="channels__popover"
          @click.stop
        >
          <div class="channels__popover-container">
            <ul class="channels__popover-list">
              <li
                v-for="channel in channels"
                :key="channel.channelId"
                class="channels__popover-item"
                @click="selectChannel(channel)"
              >
                {{ channel.title }}
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const showPopup = ref(true)
const customDiv = ref(null)

const props = defineProps({
  channels: {
    type: Array,
    required: false,
  }
})

const emit = defineEmits(['selectChannel']);

const getDefaultChannel = () => {
  return props.channels.find(channel => channel.type === 'default');
}
const selectedChannel = ref(getDefaultChannel())

const selectChannel = (channel) => {
  // console.log('channel selected', channel);
  selectedChannel.value = channel;
  toggle();
  emit('selectChannel', selectedChannel.value);
}

const toggle = () => {
  showPopup.value = !showPopup.value
}

const handleClickOutside = (event) => {
  if (customDiv.value && !customDiv.value.contains(event.target)) {
    showPopup.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style
  scoped
  lang="scss"
>
.channels {

  &__button {
    background-color: transparent;
    border: none;

    span {
      display: block;
      cursor: pointer;
      padding: var(--chat-input-button-padding);
      font-size: var(--icon-font-size-medium);
      color: var(--icon-color);
    }
  }

  &__title-container {
    position: absolute;
    top: 4px;
    right: 10px;
  }

  &__title {
    font-weight: 500;
    font-size: var(--channels-title-font-size);
  }

  &__selected {
    display: flex;
    justify-content: flex-start;
    align-items: var(--channels-selected-align-items);
    column-gap: var(--channels-selected-gap);
  }

  &__icon {
    display: block;
    height: fit-content;
    width: var(--channels-selected-icon-width);
    height: var(--channels-selected-icon-height);

    img {
      width: var(--channels-selected-icon-width);
      height: var(--channels-selected-icon-height);
    }
  }

  &__popover {
    position: absolute;
    width: fit-content;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.11);
    top: var(--channels-popover-position-top);
    right: var(--channels-popover-position-right);
    background-color: var(--channels-popover-background-color);
    padding: var(--channels-popover-padding);
    border-radius: var(--channels-popover-border-radius);
  }

  &__popover-list {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
  }

  &__popover-item {
    cursor: pointer;
  }
}

.v-enter-active {
  transition: all 0.2s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
