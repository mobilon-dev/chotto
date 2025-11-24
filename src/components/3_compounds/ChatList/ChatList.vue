<template>
  <div class="chat-list">
    <slot name="header" />


    <!--  ???? не понятно зачем этот слот  -->
    <slot name="sidebar" />

    <ChatFilter
      v-if="filterEnabled"
      class="chat-list__filter"
      @update="getFilter"
    />

    <ChatTabs
      v-if="dialogTabs && dialogTabs.length > 0"
      :tabs="dialogTabs"
      @tab-click="handleTabClick"
    />

    <!-- Индикатор поиска -->
    <div 
      v-if="isSearching || searchQuery"
      class="chat-list__search-indicator"
    >
      <div class="chat-list__search-content">
        <div class="chat-list__search-text">
          <span
            v-if="isSearching"
            class="chat-list__search-progress"
          >
            {{ searchProgress || 'Поиск...' }}
          </span>
          <span
            v-else
            class="chat-list__search-query"
          >
            Поиск "{{ searchQuery }}" завершён
            <span
              v-if="searchStats.loaded > 0"
              class="chat-list__search-stats"
            >
              ({{ searchStats.loaded }} {{ searchStats.total !== '?' ? `из ${searchStats.total}` : '' }})
            </span>
          </span>
        </div>
        <button 
          v-if="searchQuery"
          class="chat-list__search-clear"
          title="Очистить поиск"
          @click="emit('clear-search')"
        >
          <i class="pi pi-times" />
        </button>
      </div>
    </div>

    <div 
      ref="refChatList"
      class="chat-list__items"
      @scroll="scrollCheck"
      @mousedown="startScrollWatch"
      @mouseup="stopScrollWatch"
    >
      <div
        v-if="getSortedAndFilteredChats().length === 0"
        class="chat-list__no-data"
      >
        <div class="chat-list__placeholder">
          <p class="chat-list__placeholder-title">
            Нет контактных данных, чтобы начать чат
          </p>
          <p class="chat-list__placeholder-hint">
            Добавьте номер телефона или имя Telegram в карточку контакта
          </p>
        </div>
      </div>

      <template v-else>
        <div class="chat-list__fixed-items-top">
          <ChatItem
            v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedTop)"
            :key="chat.chatId"
            class="chat-list__item"
            :chat="chat"
            :show-dialogs="showDialogs"
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
            :show-dialogs="showDialogs"
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
            :show-dialogs="showDialogs"
            @select="selectChat"
            @expand="expandChat"
            @action="action"
          />
        </div>
      </template>
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
import { ref, computed } from 'vue';
import ChatItem from '@/components/2_chatlist_elements/ChatItem/ChatItem.vue';
import ChatFilter from '@/components/2_chatlist_elements/ChatFilter/ChatFilter.vue';
import ChatTabs from '@/components/2_chatlist_elements/ChatTabs/ChatTabs.vue';
import {
  useChatListScroll,
  useChatListSelection,
  useChatListFilter,
  useChatListActions,
} from './composables';

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
  filterQuery: {
    type: String,
    default: null
  },
  dialogTabs: {
    type: Array,
    default: () => [],
  },
  activeTabId: {
    type: String,
    default: 'all',
  },
  // Props для поиска
  searchQuery: {
    type: String,
    default: '',
  },
  isSearching: {
    type: Boolean,
    default: false,
  },
  searchProgress: {
    type: String,
    default: '',
  },
  searchStats: {
    type: Object,
    default: () => ({ loaded: 0, total: '?' }),
  },
  showDialogs: {
    type: Boolean,
    default: true,
  },
});

// Define emits
const emit = defineEmits(['select', 'action', 'loadMoreChats', 'expand', 'tab-click', 'search', 'clear-search']);

const refChatList = ref();
const chatsRef = computed(() => props.chats);

// Используем composables
const {
  isShowButton,
  scrollToTopForce,
  scrollCheck,
  startScrollWatch,
  stopScrollWatch,
} = useChatListScroll({ refChatList, chats: chatsRef, emit });

const {
  selectChat,
} = useChatListSelection({ chats: chatsRef, emit });

const {
  getSortedAndFilteredChats,
  getFilter,
} = useChatListFilter({ props, emit });

const {
  expandChat,
  action,
  handleTabClick,
} = useChatListActions({ emit });
</script>

<style scoped lang="scss">
@use './styles/ChatList.scss';
</style>
