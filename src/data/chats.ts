import tatianaImg from '../data/images/image1.png'

export const chats = [
  {
    chatId: 1, name: "Василий ВасилийВасилийВасилий Василий",
    avatar: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
    countUnread: 102,
    lastMessage: 'Длинное сообщение сомнительного характера в контексте размещения на малой строке',
    'lastActivity.time': 'час назад',         // читаемый формат - для пользователей
    'lastActivity.timestamp': '1727001759',   // для сортировки
    isFixedBottom: false,
    status: "#767676",
    'lastMessage.status': 'read',
    actions: [
      { action: 'addDialog', title: 'новый диалог', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=add' },
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=del' },
    ],
    typing: true,
    metadata: '',    // фильтр работает по name и данным в metadata
    dialogsExpanded: true,
    dialogs: [
      {
        dialogId: 'dlg_43543555',
        icon: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
        name: 'диалог1 79135292926',
        fullname: 'диалог1 номер 79135292926 канал whatsapp 73912000000 (основной)',   // для tooltip'а
        countUnread: 10,
        'lastActivity.time': 'час назад',  
        'lastActivity.timestamp': 1727001759456,   // для сортировки
        isSelected: false,
      },
      {
        dialogId: 'dlg_89789879',
        icon: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
        name: 'диалог2 7913529XXXX',
        fullname: 'диалог2 номер 7913529XX27 канал whatsapp 73912000000 (основной)',
        countUnread: 90,
        'lastActivity.time': '2 часа назад',
        'lastActivity.timestamp': 1727001759111,   // для сортировки
        isSelected: false,
      },
      {
        dialogId: 'all',
        name: 'Просмотр всех диалогов',
        'lastActivity.timestamp': 17270000000,   // для сортировки
        countUnread: 100,
        isSelected: false,
      }
    ],
    contact: {
      attributes: [
        {
          id: 'phone:79135292926',
          value: 'whatsapp 79135292926',
        },
        {
          id: 'phone:7913529XXXX',
          value: 'whatsapp 7913529XXXX',
        },
        {
          id: 'tgNickName:@antirek',
          value: 'telegram @antirek',
        },
      ],
    },
  },
  /*{
    chatId: 25, name: "Василий ВасилийВасилийВасилий Василий",
    avatar: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
    countUnread: 102,
    lastMessage: 'Длинное сообщение сомнительного характера в контексте размещения на малой строке',
    dialogsExpanded: true,
    actions: [
      { action: 'addDialog', title: 'Новый диалог', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=add' },
      { action: 'add', title: 'добавить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=add' },
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=del' },
    ],
    dialogs: [
      {
        dialogId: 'dlg_43543551',
        name: 'диалог1 79135292926',
        fullname: 'диалог1 номер 79135292926 канал whatsapp 73912000000 (основной)',   // для tooltip'а
        countUnread: 10,
        'lastActivity.timestamp': 1727001759456,   // для сортировки
        isSelected: true,
      },
      {
        dialogId: 'dlg_89789872',
        name: 'диалог2 7913529XXXX',
        fullname: 'диалог2 номер 7913529XX27 канал whatsapp 73912000000 (основной)',
        countUnread: 90,
        'lastActivity.timestamp': 1727001759111,   // для сортировки
        isSelected: false,
      },
    ],
    contact: {
      attributes: [
        {
          id: 'phone:79135292926',
          value: 'whatsapp 79135292926',
        },
        {
          id: 'phone:7913529XXXX',
          value: 'whatsapp 7913529XXXX',
        },
        {
          id: 'tgNickName:@antirek',
          value: 'telegram @antirek',
        },
      ],
    },
  },*/
  {
    chatId: 2, name: "Васильева Татьяна Александровна",
    avatar: tatianaImg,
    colorUnread: 'green',
    lastMessage: 'Лучше отправьте документы Алексею, он бухгалтер',
    countUnread: 0, isFixedTop: true,
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727027359',
    'lastMessage.status': 'received',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'unpin', title: 'открепить' },
    ],
    status: "#00b972",
    metadata: '',
    contact: {
      attributes: [
        {
          id: 'phone:79135292926',
          value: 'whatsapp 79135292926',
        },
        {
          id: 'phone:7913529XXXX',
          value: 'whatsapp 7913529XXXX',
        },
        {
          id: 'tgNickName:@antirek',
          value: 'telegram @antirek',
        },
      ],
    },
    // commands: [
    //   {
    //     action: 'start',
    //     title: '/start',
    //     description: 'начать работу с чатботом'
    //   },
    //   {
    //     action: 'info',
    //     title: '/info',
    //     description: 'информация о чатботе'
    //   }
    // ]
  },
  {
    chatId: 3, name: "Анна",
    countUnread: 0, isFixedBottom: true,
    lastMessage: 'text',
    'lastMessage.status': 'sent',
    'lastActivity.timestamp': '1727027359',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'unpin', title: 'открепить' },
    ],
    metadata: '',
  },
  {
    chatId: 4, name: "Василий", countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад', statusMessage: 'received', isFixed: false, status: "#00b972", actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
  },
  {
    chatId: 5, name: "Много SMS",
    countUnread: 0, lastMessage: 'test',
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727027259',
    'lastMessage.status': 'sent',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
  },
  {
    chatId: 6, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727023159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
  },
  {
    chatId: 7, name: "Василий 2",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    'lastMessage.status': 'received',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    typing: true,
    metadata: '',
  },
  {
    chatId: 8, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
  },
  {
    chatId: 9, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    'lastMessage.status': 'read',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: 'Данияр',
  },
  {
    chatId: 10, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
  },
  {
    chatId: 11, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
  },
  {
    chatId: 12, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
  },
];
