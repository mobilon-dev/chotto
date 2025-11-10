import { ref } from 'vue';

/**
 * Композабл для фильтрации и сортировки списка чатов.
 * Инкапсулирует логику сортировки по времени активности и количеству
 * непрочитанных сообщений, фильтрации по табам, тегам и текстовому поиску.
 */

/**
 * Тип элемента чата.
 */
type ChatItem = {
  chatId: string;
  name: string;
  metadata: string;
  countUnread: number;
  'lastActivity.timestamp'?: string | number;
  contact?: {
    tags?: Array<{ tagId: string }>;
  };
  [key: string]: unknown;
};

/**
 * Параметры компонента для фильтрации.
 */
type ChatListFilterProps = {
  chats: ChatItem[];
  filterEnabled: boolean;
  titleEnabled?: boolean;
  title?: string;
  filterQuery?: string | null;
  dialogTabs?: unknown[];
  activeTabId?: string;
  searchQuery?: string;
  isSearching?: boolean;
  searchProgress?: string;
  searchStats?: { loaded: number; total: number | string };
};

/**
 * Тип эмиттера событий для фильтрации.
 */
type ChatListFilterEmit = {
  (event: 'search', value: string): void;
  (event: 'clear-search'): void;
};

/**
 * Параметры и зависимости композабла.
 */
interface UseChatListFilterOptions {
  props: ChatListFilterProps;
  emit: ChatListFilterEmit;
}

export function useChatListFilter({ props, emit }: UseChatListFilterOptions) {
  /**
   * Локальное значение фильтра для текстового поиска.
   */
  const filter = ref('');

  /**
   * Возвращает отсортированный и отфильтрованный список чатов.
   * Сортировка выполняется по времени последней активности (по убыванию),
   * затем по количеству непрочитанных сообщений (по убыванию).
   * Фильтрация применяется по активному табу, тегам и текстовому поиску.
   */
  const getSortedAndFilteredChats = () => {
    // Проверяем, есть ли чаты в props
    if (!props.chats || props.chats.length === 0) {
      return [];
    }

    const result = props.chats
      .slice()
      // Сортировка по времени последней активности (новые сверху)
      .sort((a: ChatItem, b: ChatItem) => {
        const aTimestamp = Number(a['lastActivity.timestamp'] || 0);
        const bTimestamp = Number(b['lastActivity.timestamp'] || 0);
        if (aTimestamp > bTimestamp) return -1;
        if (aTimestamp < bTimestamp) return 1;
        return 0;
      })
      // Сортировка по количеству непрочитанных (больше сверху)
      .sort((a: ChatItem, b: ChatItem) => {
        if (a.countUnread > b.countUnread) return -1;
        if (a.countUnread < b.countUnread) return 1;
        return 0;
      })
      // Фильтрация по табам, тегам и текстовому поиску
      .filter((c: ChatItem) => {
        const activeTabId = props.activeTabId || 'all';
        // Универсальная фильтрация по табам
        if (activeTabId === 'all') {
          // Показываем все чаты
        } else if (activeTabId === 'countUnread') {
          // Показываем только чаты с непрочитанными сообщениями
          if (c.countUnread <= 0) return false;
        } else if (activeTabId.startsWith('tag_')) {
          // Показываем чаты с определенным тегом
          if (!c.contact?.tags || !c.contact.tags.some((tag: { tagId: string }) => tag.tagId === activeTabId)) {
            return false;
          }
        }

        // Фильтрация по тексту (только если не в режиме поиска)
        if (props.searchQuery && props.searchQuery.trim() !== '') {
          // В режиме поиска показываем все чаты из store (они уже отфильтрованы API)
          return true;
        } else {
          // Обычная локальная фильтрация
          if (!props.filterQuery) {
            return c.name.includes(filter.value) ||
              c.metadata.includes(filter.value);
          } else {
            return c.name.includes(props.filterQuery) ||
              c.metadata.includes(props.filterQuery);
          }
        }
      });

    return result;
  };

  /**
   * Обрабатывает изменение значения фильтра.
   * Обновляет локальное значение и эмитит соответствующее событие:
   * 'search' при наличии текста или 'clear-search' при очистке.
   */
  const getFilter = (value: string) => {
    filter.value = value;
    // Если есть поисковый запрос, эмитим событие поиска
    if (value.trim() !== '') {
      emit('search', value);
    } else {
      // Если поле поиска очищено, эмитим событие очистки поиска
      emit('clear-search');
    }
  };

  return {
    filter,
    getSortedAndFilteredChats,
    getFilter,
  };
}

