export const channels = [
  { 
    branchId: "bch_1",
    channelId: 'whatsapp.W0010',
    title: 'test channel 1', 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png',
    status: "active",
    autoAccess: false
  },
  { 
    branchId: "bch_1",
    channelId: 'waba.WABA0007', 
    title: 'test channel 2',
    status: "active",
    autoAccess: false
  },

  // Примеры структуры каналов из приложения
  {
    branchId: "bch_1",
    channelId: "whatsapp.W1243",  // тип канала может определяться по префиксу channelId
    title: "whatsapp 73910001100 (default)",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_1",
    channelId: "whatsapp.W5432",
    title: "whatsapp 79130001111",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_1",
    channelId: "waba.WABA7534",
    title: "Отдел продаж 79560002200",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_1",
    channelId: "telegram.T6432",
    title: "telegram 79830003300",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_1",
    channelId: "telegrambot.TGB5431",
    title: "TG Bot №14",
    status: "active",
    autoAccess: false
  },
  // Каналы для чата "Георгий Звонарь" (chatId: 8)
  {
    branchId: "bch_111",
    channelId: "whatsapp.W2222",
    title: "whatsapp 73910001100 (основной)",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_222",
    channelId: "telegram.T222",
    title: "telegram 79135292926",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_333",
    channelId: "max.M333",
    title: "max 79135292926",
    status: "active",
    autoAccess: false
  },
  {
    branchId: "bch_444",
    channelId: "sms.M444",
    title: "SMS 79135292926",
    status: "active",
    autoAccess: false
  }
];
