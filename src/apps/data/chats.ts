import tatianaImg from '../data/images/image1.png'

export const chats = [
  {
    chatId: 1, name: "Васильев Василий Васильевич",
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
        branchId: 'bch_1',
        dialogId: 'dlg_43543555',
        attributeId: 'atr_1',
        channelId: 'whatsapp.W1243',
        icon: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
        name: 'диалог1 79135292926',
        fullname: 'диалог1 номер 79135292926 канал whatsapp 73910001100 (основной)',   // для tooltip'а
        countUnread: 10,
        'lastActivity.time': 'час назад',  
        'lastActivity.timestamp': 1757318879000,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_1',
        dialogId: 'dlg_89789879',
        attributeId: 'atr_2',
        channelId: 'whatsapp.W1243',
        icon: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
        name: 'диалог2 7913529XXXX',
        fullname: 'диалог2 номер 7913529XX27 канал whatsapp 73910001100 (основной)',
        countUnread: 90,
        'lastActivity.time': '8 months ago',
        'lastActivity.timestamp': 1737014959111,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_1',
        dialogId: 'dlg_17431847',
        attributeId: 'atr_2',
        channelId: 'whatsapp.W5432',
        icon: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
        name: 'диалог3 7913529XXXX whatsapp.W5432',
        fullname: 'диалог3 7913529XXXX whatsapp.W5432',
        countUnread: 90,
        'lastActivity.time': 'a year ago',
        'lastActivity.timestamp': 1727006459111,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_1',
        dialogId: 'dlg_00123981',
        attributeId: 'atr_2',
        channelId: 'waba.WABA7534',
        name: 'диалог4 7913529XXXX waba.WABA7534',
        fullname: 'диалог4 7913529XXXX waba.WABA7534',
        countUnread: 90,
        'lastActivity.time': 'a year ago',
        'lastActivity.timestamp': 1727131759111,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_1',
        dialogId: 'dlg_89460153',
        attributeId: 'atr_3',
        channelId: 'telegram.T6432',
        name: 'диалог5 telegram @antirek (telegram)',
        fullname: 'диалог5 telegram @antirek (telegram)',
        countUnread: 90,
        'lastActivity.time': 'a year ago',
        'lastActivity.timestamp': 1727641759111,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_1',
        dialogId: 'dlg_71053061',
        attributeId: 'atr_3',
        channelId: 'telegrambot.TGB5431',
        name: 'диалог6 telegram @antirek (telegrambot)',
        fullname: 'диалог6 telegram @antirek (telegrambot)',
        countUnread: 90,
        'lastActivity.time': 'a year ago',
        'lastActivity.timestamp': 1727001759123,   // для сортировки
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
      // Структуру атрибутов контакта можно пока оставить без изменений,
      // но стоит учитывать, что поле id может не содержать содержательной информации (тип или номер телефона, как в примерах ниже).
      // К примеру, поле id может быть равно atr_1, atr_adsafg и т.д. 
      attributes: [
        {
          id: 'atr_1',
          type: 'phone',
          data: '79135292926',
          value: 'whatsapp 79135292926',
        },
        {
          id: 'atr_2',
          type: 'phone',
          data: '7913529XXXX',
          value: 'whatsapp 7913529XXXX',
        },
        {
          id: 'atr_3',
          type: 'telegram',
          data: {
            id: '182940012993',
            nickname: 'test_nick',
            phone: '79139310012'
          },
          value: '@antirek',
        },
      ],
      "tags": [
        {
            "_id": "68c7ae619e1379f11fb3ca8d",
            "branchId": "bch_dq5clne",
            "tagId": "tag_amq9w5j",
            "data": "Партнеры"
        },
        {
            "_id": "68c7b0b09e1379f11fb52e50",
            "branchId": "bch_dq5clne",
            "tagId": "tag_a8egnkm",
            "data": "База партнеров"
        },
        {
            "_id": "68cb964fc01695a4f5ebe040",
            "branchId": "bch_dq5clne",
            "tagId": "tag_hmfwm82",
            "data": "Партнеры Марина 18.09 - 1"
        }
      ]
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
    'lastMessage.status': 'error',
    // actions: [
    //   { action: 'edit', title: 'изменить' }, { action: 'unpin', title: 'открепить' },
    // ],
    status: "#00b972",
    metadata: '',
    contact: {
      attributes: [
        {
          id: 'phone:79831693504',
          value: 'whatsapp 79831693504',
        },
        {
          id: 'phone:74992907555',
          value: 'whatsapp 74992907555',
        },
        {
          id: 'tgNickName:@Ivan12345',
          value: 'telegram @Ivan12345',
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
    chatId: 6, name: "Виктор",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1761901469',
    avatar: 'https://placehold.jp/30/f1048e/ffffff/64x64.png?text=ВФ',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
    contact: {
      attributes: [
        {
          id: 'atr_1',
          type: 'phone',
          data: '79000000000',
          value: 'whatsapp 79000000000',
        },
        {
          id: 'atr_2',
          type: 'phone',
          data: '7913529XXXX',
          value: 'whatsapp 7900000XXXX',
        },
        {
          id: 'atr_3',
          type: 'telegram',
          data: {
            id: '182940012993',
            nickname: 'test_nick',
            phone: '79139310012'
          },
          value: '@antirek',
        },
      ],
      "tags": [
        {
            "_id": "68c7ae619e1379f11fb3ca8d",
            "branchId": "bch_dq5clne",
            "tagId": "tag_amq9w5j",
            "data": "Партнеры"
        },
        {
            "_id": "68c7b0b09e1379f11fb52e50",
            "branchId": "bch_dq5clne",
            "tagId": "tag_a8egnkm",
            "data": "База партнеров"
        },
        {
            "_id": "68cb964fc01695a4f5ebe040",
            "branchId": "bch_dq5clne",
            "tagId": "tag_hmfwm82",
            "data": "Партнеры Марина 18.09 - 1"
        }
      ]
    },
  },
  {
    chatId: 7, name: "Пётр",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    'lastMessage.status': 'received',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    typing: true,
    metadata: '',
    contact: {
      attributes: [
        {
          id: 'atr_1',
          type: 'phone',
          data: '79000000000',
          value: 'whatsapp 79000000000',
        },
        {
          id: 'atr_2',
          type: 'phone',
          data: '7913529XXXX',
          value: 'whatsapp 7900000XXXX',
        },
        {
          id: 'atr_3',
          type: 'telegram',
          data: {
            id: '182940012993',
            nickname: 'test_nick',
            phone: '79139310012'
          },
          value: '@antirek',
        },
      ],
      "tags": [
        {
            "_id": "68cb964fc01695a4f5ebe040",
            "branchId": "bch_dq5clne",
            "tagId": "tag_hmfwm82",
            "data": "Партнеры Марина 18.09 - 1"
        }
      ]
    },
  },
  {
    chatId: 8, name: "Георгий Звонарь",
    avatar: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: '',
    dialogs: [
      { 
        branchId: 'bch_111',
        dialogId: 'dlg_43543111',
        attributeId: 'atr_whatsapp',
        channelId: 'whatsapp.W2222',
        name: 'диалог1 whatsapp',
        fullname: 'диалог1 номер 73910001100 канал whatsapp 73910001100 (основной)',   // для tooltip'а
        countUnread: 0,
        'lastActivity.time': 'час назад',  
        'lastActivity.timestamp': 1757318879000,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_222',
        dialogId: 'dlg_89789222',
        attributeId: 'atr_telegram',
        channelId: 'telegram.T222',
        name: 'диалог2 telegram',
        fullname: 'диалог2 telegram',
        countUnread: 0,
        'lastActivity.time': 'час назад',
        'lastActivity.timestamp': 1727641759111,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_333',
        dialogId: 'dlg_00123333',
        attributeId: 'atr_max',
        channelId: 'max.M333',
        name: 'диалог3 max',
        fullname: 'диалог3 max',
        countUnread: 0,
        'lastActivity.time': 'час назад',
        'lastActivity.timestamp': 1727641759111,   // для сортировки
        isSelected: false,
      },
      { 
        branchId: 'bch_444',
        dialogId: 'dlg_00124444',
        attributeId: 'atr_sms',
        channelId: 'sms.M444',
        name: 'диалог4 sms',
        fullname: 'диалог4 sms',
        countUnread: 0,
        'lastActivity.time': 'час назад',
        'lastActivity.timestamp': 1727641759111,   // для сортировки
        isSelected: false,
      },
      {
        dialogId: 'all',
        name: 'Просмотр всех диалогов',
        'lastActivity.timestamp': 17270000000,   // для сортировки
        countUnread: 0,
        isSelected: false,
      }
    ],
    contact: {
      attributes: [
        {
          id: 'atr_whatsapp',
          type: 'whatsapp',
          data: '73910001100',
          value: '73910001100',
        },
        {
          id: 'atr_telegram',
          type: 'telegram',
          data: {
            id: '182940012993',
            nickname: 'georgiy_zvonar',
            phone: '79135292926'
          },
          value: '@georgiy_zvonar',
        },
        {
          id: 'atr_max',
          type: 'max',
          data: '79135292926',
          value: '79135292926',
        },
        {
          id: 'atr_sms',
          type: 'sms',
          data: '79135292926',
          value: '79135292926',
        },
      ],
    },
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
