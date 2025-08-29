<template>
  <div class="chat-list">
    <div
      class="chat-list__title-container"
    >
      <h2
        v-if="titleEnabled"
        class="chat-list__title"
      >
        {{ t('component.ChatList.Title') }}
      </h2>

      <slot name="actions" />
    </div>

    <slot name="sidebar" />

    <ChatFilter
      v-if="filterEnabled"
      class="chat-list__filter"
      @update="getFilter"
    />

    <ChatTabs
      :tabs="dialogTabs"
      @tab-click="handleTabClick"
    />

    <div 
      ref="refChatList"
      class="chat-list__items"
      @scroll="scrollCheck"
      @mousedown="startScrollWatch"
      @mouseup="stopScrollWatch"
    >
      <div class="chat-list__fixed-items-top">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedTop)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @expand="expandChat"
          @action="action"
        />
      </div>

      <div class="chat-list__scrollable-items">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => !c.isFixedBottom && !c.isFixedTop)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @expand="expandChat"
          @action="action"
        />
      </div>

      <div class="chat-list__fixed-items-bottom">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedBottom)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @expand="expandChat"
          @action="action"
        />
      </div>
    </div>
    <transition>
      <button
        v-if="isShowButton"
        class="chat-list__button-up"
        @click="scrollToTopForce"
      >
        <span class="pi pi-angle-up chat-list__icon-down" />
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, unref, watch, nextTick } from 'vue';
import { ChatItem, ChatFilter } from "./";
// import { ContextMenu } from "./";
import { t } from '../../locale/useLocale';
import ChatTabs from '@/library/components/ChatTabs.vue';

// Define props
const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
  filterEnabled: {
    type: Boolean,
    required: true,
  },
  titleEnabled: {
    type: Boolean,
    default: true,
  },
  filterQuery: {
    type: String,
    default: null
  }
});

// Define emits
const emit = defineEmits(['select', 'action', 'loadMoreChats', 'expand']);

const filter = ref('');
const refChatList = ref()

const allowLoadMore = ref(false)
const isShowButton = ref(false)
const isScrollByMouseButton = ref(false)


function scrollToTopForce() {
  nextTick(function () {
    const element = unref(refChatList);
    element.scrollTop = 0;
  })
}

const scrollCheck = () => {
  const element = unref(refChatList);
  const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
  if (element.scrollTop > 500){
    isShowButton.value = true
  }
  if (element.scrollTop <= 500){
    isShowButton.value = false
  }

  if (isScrollByMouseButton.value){
    if (scrollBottom < 300){    
      allowLoadMore.value = true  
    }
  }
  else{
    if (scrollBottom < 300){
      allowLoadMore.value = true
    }
    if (scrollBottom >= 300){
      allowLoadMore.value = false
    }
  }
};

watch(
  () => allowLoadMore.value,
  () => {
    if (allowLoadMore.value)
      emit('loadMoreChats')
  }
)

watch(
  () => props.chats,
  () => {
    allowLoadMore.value = false
    if (isScrollByMouseButton.value){
      const element = unref(refChatList);
      element.scrollTop = element.scrollHeight
    }
  }
)

const startScrollWatch = (event) => {
  const element = unref(refChatList);
  const isScrollbar = event.offsetX > element.clientWidth || event.offsetY > element.clientHeight;
  if (isScrollbar) {
    isScrollByMouseButton.value = true
  }
}

const stopScrollWatch = () => {
  isScrollByMouseButton.value = false
}

const expandChat = (args) => {
  emit('expand', args)
}

// Define method
const selectChat = (args) => {
  props.chats.forEach(c => {
    c.isSelected = false
    if (c.dialogs) 
      c.dialogs.forEach(d => {
        d.isSelected = false
      })
  });
  if (args.dialog) {
    selectDialog(args.dialog)
  }
  const c = props.chats.find(c => c.chatId === args.chat.chatId);
  c.isSelected = true;
  emit('select', args);
};

const selectDialog = (dialog) => {
  props.chats.forEach(c => {
    c.isSelected = false
    if (c.dialogs) 
      c.dialogs.forEach(d => {
        d.isSelected = false
        if (d.dialogId == dialog.dialogId)
        d.isSelected = true
      })
  });
}

const getSortedAndFilteredChats = () => {
  return props.chats
    .toSorted((a, b) => {
      if (Number(a['lastActivity.timestamp']) > Number(b['lastActivity.timestamp'])) return -1;
      if (Number(a['lastActivity.timestamp']) < Number(b['lastActivity.timestamp'])) return 1;
      if (Number(a['lastActivity.timestamp']) == Number(b['lastActivity.timestamp'])) return 0;
    })
    .toSorted((a, b) => {   // immutable sort
      if (a.countUnread > b.countUnread) return -1;
      if (a.countUnread < b.countUnread) return 1;
      if (a.countUnread == b.countUnread) return 0;
    })
    .filter(c => {
      if (!props.filterQuery)
        return c.name.includes(filter.value) ||
          c.metadata.includes(filter.value);
      else 
        return c.name.includes(props.filterQuery) ||
          c.metadata.includes(props.filterQuery);
    });
}

const getFilter = (value) => {
  filter.value = value;
}

const action = (data) => emit('action', data);

const dialogTabs = ref([
  { id: 'all', label: 'Все', count: 2, active: true },
  { id: 'deal', label: 'По сделке', count: 3, active: false },
  { id: 'rejected', label: 'Непринятые', count: 1, active: false },
]);

const handleTabClick = (tabId) => {
  dialogTabs.value.forEach(tab => {
    tab.active = tab.id === tabId;
  });
};
</script>

<style
  scoped
  lang="scss"
>
.chat-list {
  background-color: transparent;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  height: 70%;

  &__filter {
    margin: var(--chotto-chat-list-filter-margin);
  }

  &__items {
    display: block;
    scroll-behavior: smooth;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--chotto-chat-list-items-padding);

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--chotto-scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--chotto-scrollbar-thumb-bg);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  &__fixed-items-top,
  &__fixed-items-bottom {
    z-index: 100;
    display: block;
    position: sticky;
    background-color: var(--chotto-chat-list-fixed-background-color);
  }

  &__fixed-items-top {
    top: 0;
  }


  &__fixed-items-bottom {
    bottom: 0;
  }

  &__title {
    font-family: var(--chotto-header-font, var(--chotto-container-font-family));
    font-size: var(--chotto-header-font-size);
    font-weight: var(--chotto-header-font-weight);
    color: var(--chotto-header-font-color, var(--chotto-primary-text-color));
  }

  &__title-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 50px;
    padding: var(--chotto-chat-list-title-container-padding);
  }

  &__context-menu {
    position: absolute;
    top: 46px;
    right: 20px;
  }

  &__button-up {
    position: absolute;
    z-index: 100;
    bottom: 15px;
    right: 25px;
    margin-left: auto;
    border: none;
    min-width: 40px;
    min-height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--chotto-button-color-disabled);
  }

  &__icon-up {
    font-size: var(--chotto-button-icon-size);
    color: var(--chotto-button-color-active);
  }
}

.menu-enter-active {
  transition: all 0.1s ease-out;
}

.menu-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.menu-enter-from,
.menu-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
