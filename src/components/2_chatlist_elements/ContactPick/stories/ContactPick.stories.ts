import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import ChatList from '@/components/3_compounds/ChatList/ChatList.vue';
import ChatListHeader from '@/components/3_compounds/ChatList/ChatListHeader.vue';
import ChatListAddButton from '@/components/3_compounds/ChatList/ChatListAddButton.vue';
import {
  ContactPickColumn,
  ContactPickSubheader,
  ContactPickSearchField,
  ContactPickList,
  ContactPickInfoBanner,
  ContactPickFooterButton,
} from '../index';
import type { ContactPickItem } from '../types';

const sampleContacts: ContactPickItem[] = [
  { id: 1, name: 'Анна Козлова', initials: 'АК', avatarColor: '#6c8cff' },
  { id: 2, name: 'Борис Иванов', initials: 'БИ', avatarColor: '#34a06c' },
  { id: 3, name: '7-Taxi', initials: '7', avatarColor: '#888' },
  { id: 4, name: 'Вера Смирнова', initials: 'ВС', avatarColor: '#e05b8f' },
];

const meta: Meta = {
  title: 'Chat List Elements/ContactPick',
};

export default meta;

type Story = StoryObj;

export const PickFlowInChatList: Story = {
  render: () => ({
    components: {
      ChatList,
      ChatListHeader,
      ChatListAddButton,
      ContactPickColumn,
  ContactPickSubheader,
      ContactPickSearchField,
      ContactPickList,
      ContactPickInfoBanner,
      ContactPickFooterButton,
    },
    setup() {
      const listMode = ref<'chats' | 'pick' | 'create'>('pick');
      const query = ref('');
      const selectedId = ref<string | number | null>(null);
      const filtered = () => {
        const q = query.value.trim().toLowerCase();
        if (!q) {
          return sampleContacts;
        }
        return sampleContacts.filter((c) => c.name.toLowerCase().includes(q));
      };
      return {
        listMode,
        query,
        selectedId,
        filtered,
        sampleContacts,
      };
    },
    template: `
      <div data-theme="mobilon1" style="width:380px;height:720px;display:flex;border:1px solid #eee;">
        <ChatList
          :chats="[]"
          :filter-enabled="false"
          :list-mode="listMode"
        >
          <template #pick>
            <ContactPickColumn>
              <ContactPickSubheader title="Новый чат" @back="listMode = 'chats'" />
              <ContactPickSearchField v-model="query" />
              <ContactPickInfoBanner loading>
                Загружаем контакты, список может быть неполным
              </ContactPickInfoBanner>
              <ContactPickList
                :items="filtered()"
                :search-query="query"
                :selected-id="selectedId"
                @select="(item) => { selectedId = item.id }"
                @new-contact="listMode = 'create'"
              />
            </ContactPickColumn>
          </template>
          <template #create>
            <ContactPickColumn>
              <ContactPickSubheader title="Новый контакт" @back="listMode = 'pick'" />
              <div style="flex:1;padding:16px;color:#5f5f5f;font-size:14px;">
                Слот #create: сюда приложение подставляет форму создания контакта.
              </div>
              <ContactPickFooterButton label="Сохранить контакт" />
            </ContactPickColumn>
          </template>
        </ChatList>
      </div>
    `,
  }),
};

export const ChatsHeaderWithAddButton: Story = {
  render: () => ({
    components: { ChatListHeader, ChatListAddButton },
    template: `
      <div data-theme="mobilon1" style="width:380px;">
        <ChatListHeader title="Mobilon One" :logo-enabled="true">
          <template #actions>
            <ChatListAddButton />
          </template>
        </ChatListHeader>
      </div>
    `,
  }),
};