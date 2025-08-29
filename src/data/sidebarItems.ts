import borisImage from '../data/images/image.png';
import vasiliyImage from '../data/images/image34.png';
import radijImage from '../data/images/image35.png';

export const sidebarItems = [
  {
    itemId: 'itemId0',
    icon: vasiliyImage,
    name: 'Василий Петрович',
    notificationCount: 100,
    selected: false,
  },
  {
    itemId: 'itemId1',
    icon: radijImage,
    name: 'Радий Юсупович',
    notificationCount: 10,
    notificationColor: '#FF0000',
    selected: false,
  },
  {
    itemId: 'itemId2',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=MV',
    name: 'Виталий',
    notificationCount: 7,
    notificationColor: '#FF0000',
    selected: false,
  },
  {
    itemId: 'itemId3',
    icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=DP',
    notificationCount: 0,
    notificationColor: '#FF0000',
    selected: false,
  },
  {
    itemId: 'itemId4',
    icon: borisImage,
    name: 'Борис',
    isFixedBottom: true,
    notificationCount: 99,
    notificationColor: '#00FF00',
    selected: true,
  },
];
