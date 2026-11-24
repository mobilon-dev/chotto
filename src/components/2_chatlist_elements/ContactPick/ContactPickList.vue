<template>
  <div
    class="contact-pick-list"
    data-testid="contact-pick-list"
  >
    <slot name="before" />

    <div class="contact-pick-list__items">
      <template v-if="isIdleList">
        <ContactPickNewRow
          v-if="showNewContactRow"
          :label="newContactLabel"
          @click="emit('new-contact')"
        />
        <template
          v-for="group in letterGroups"
          :key="group.letter"
        >
          <div class="contact-pick-letter">
            {{ group.letter }}
          </div>
          <ContactPickRow
            v-for="item in group.items"
            :key="item.id"
            :name="item.name"
            :initials="item.initials"
            :avatar-color="item.avatarColor"
            :active="isActive(item)"
            @select="emit('select', item)"
          />
        </template>
      </template>

      <template v-else-if="hasSearchResults">
        <div class="contact-pick-letter">
          {{ searchResultsLetter }}
        </div>
        <ContactPickRow
          v-for="item in items"
          :key="item.id"
          :name="item.name"
          :initials="item.initials"
          :avatar-color="item.avatarColor"
          :active="isActive(item)"
          @select="emit('select', item)"
        />
      </template>

      <template v-else>
        <ContactPickEmpty :message="emptyMessage" />
        <ContactPickNewRow
          v-if="showNewContactRow"
          :label="newContactLabel"
          @click="emit('new-contact')"
        />
      </template>
    </div>

    <slot name="after" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContactPickRow from './ContactPickRow.vue';
import ContactPickNewRow from './ContactPickNewRow.vue';
import ContactPickEmpty from './ContactPickEmpty.vue';
import { groupContactsByLetter } from './utils/groupContactsByLetter';
import type { ContactPickItem } from './types';

const props = defineProps({
  items: {
    type: Array as () => ContactPickItem[],
    default: () => [],
  },
  searchQuery: {
    type: String,
    default: '',
  },
  selectedId: {
    type: [String, Number],
    default: null,
  },
  newContactLabel: {
    type: String,
    default: 'Новый контакт',
  },
  showNewContactRow: {
    type: Boolean,
    default: true,
  },
  groupAlphabetically: {
    type: Boolean,
    default: true,
  },
  searchResultsLetter: {
    type: String,
    default: 'Контакты',
  },
});

const emit = defineEmits<{
  select: [item: ContactPickItem];
  'new-contact': [];
}>();

const trimmedQuery = computed(() => props.searchQuery.trim());

const isIdleList = computed(
  () => !trimmedQuery.value.length,
);

const hasSearchResults = computed(
  () => trimmedQuery.value.length > 0 && props.items.length > 0,
);

const letterGroups = computed(() => {
  if (!props.groupAlphabetically) {
    return [{ letter: props.searchResultsLetter, items: props.items }];
  }
  return groupContactsByLetter(props.items);
});

const emptyMessage = computed(() => (
  `Не найдено результатов для «${trimmedQuery.value}»`
));

const isActive = (item: ContactPickItem) => (
  props.selectedId != null && item.id === props.selectedId
);
</script>

<style scoped lang="scss">
@use './styles/ContactPick.scss';
</style>