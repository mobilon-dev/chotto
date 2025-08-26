<template>
  <div class="chat-list">
    <div class="chat-list__title-container">
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

    <div
      ref="refChatList"
      class="chat-list__items"
      @scroll="scrollCheck"
      @mousedown="startScrollWatch"
      @mouseup="stopScrollWatch"
    >
      <div class="chat-list__fixed-items-top">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(
            (c) => c.isFixedTop
          )"
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
          v-for="chat in getSortedAndFilteredChats().filter(
            (c) => !c.isFixedBottom && !c.isFixedTop
          )"
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
          v-for="chat in getSortedAndFilteredChats().filter(
            (c) => c.isFixedBottom
          )"
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
import { ref, unref, watch, nextTick } from 'vue'
import { ChatItem, ChatFilter } from '../'
// import { ContextMenu } from "./";
import { t } from '../../../locale/useLocale'

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
    default: null,
  },
})

// Define emits
const emit = defineEmits(['select', 'action', 'loadMoreChats', 'expand'])

const filter = ref('')
const refChatList = ref()

const allowLoadMore = ref(false)
const isShowButton = ref(false)
const isScrollByMouseButton = ref(false)

function scrollToTopForce() {
  nextTick(function () {
    const element = unref(refChatList)
    element.scrollTop = 0
  })
}

const scrollCheck = () => {
  const element = unref(refChatList)
  const scrollBottom =
    element.scrollHeight - element.scrollTop - element.clientHeight
  if (element.scrollTop > 500) {
    isShowButton.value = true
  }
  if (element.scrollTop <= 500) {
    isShowButton.value = false
  }

  if (isScrollByMouseButton.value) {
    if (scrollBottom < 300) {
      allowLoadMore.value = true
    }
  } else {
    if (scrollBottom < 300) {
      allowLoadMore.value = true
    }
    if (scrollBottom >= 300) {
      allowLoadMore.value = false
    }
  }
}

watch(
  () => allowLoadMore.value,
  () => {
    if (allowLoadMore.value) emit('loadMoreChats')
  }
)

watch(
  () => props.chats,
  () => {
    allowLoadMore.value = false
    if (isScrollByMouseButton.value) {
      const element = unref(refChatList)
      element.scrollTop = element.scrollHeight
    }
  }
)

const startScrollWatch = (event) => {
  const element = unref(refChatList)
  const isScrollbar =
    event.offsetX > element.clientWidth || event.offsetY > element.clientHeight
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
  props.chats.forEach((c) => {
    c.isSelected = false
    if (c.dialogs)
      c.dialogs.forEach((d) => {
        d.isSelected = false
      })
  })
  if (args.dialog) {
    selectDialog(args.dialog)
  }
  const c = props.chats.find((c) => c.chatId === args.chat.chatId)
  c.isSelected = true
  emit('select', args)
}

const selectDialog = (dialog) => {
  props.chats.forEach((c) => {
    c.isSelected = false
    if (c.dialogs)
      c.dialogs.forEach((d) => {
        d.isSelected = false
        if (d.dialogId == dialog.dialogId) d.isSelected = true
      })
  })
}

const getSortedAndFilteredChats = () => {
  return props.chats
    .toSorted((a, b) => {
      if (
        Number(a['lastActivity.timestamp']) >
        Number(b['lastActivity.timestamp'])
      )
        return -1
      if (
        Number(a['lastActivity.timestamp']) <
        Number(b['lastActivity.timestamp'])
      )
        return 1
      if (
        Number(a['lastActivity.timestamp']) ==
        Number(b['lastActivity.timestamp'])
      )
        return 0
    })
    .toSorted((a, b) => {
      // immutable sort
      if (a.countUnread > b.countUnread) return -1
      if (a.countUnread < b.countUnread) return 1
      if (a.countUnread == b.countUnread) return 0
    })
    .filter((c) => {
      if (!props.filterQuery)
        return (
          c.name.includes(filter.value) || c.metadata.includes(filter.value)
        )
      else
        return (
          c.name.includes(props.filterQuery) ||
          c.metadata.includes(props.filterQuery)
        )
    })
}

const getFilter = (value) => {
  filter.value = value
}

const action = (data) => emit('action', data)
</script>