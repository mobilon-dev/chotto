import type { Meta, StoryObj } from '@storybook/vue3-vite';
 
import CallMessage from './CallMessage.vue';
import { ICallMessage } from '../../types';

const meta: Meta<typeof CallMessage> = {
  component: CallMessage,
  decorators: [() => ({template: '<div data-theme="light"><story /></div>'})]

};
 
export default meta;
type Story = StoryObj<typeof CallMessage>;

const message: ICallMessage = {
  url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
  position: 'left',
  messageId: 'testMessageId',
  time: '12:00',
  //status: 'read',
};

export const NoAnswerLeft: Story = {
  args: {
    message: {
      ...message,
    } as ICallMessage,
  },
};

export const NoAnswerRight: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
    } as ICallMessage,
  },
};

export const NoAnswerLeftWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const NoAnswerRightWithAvatar: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const NoAnswerLeftWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'left',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const NoAnswerRightWithAvatarAndSubtext: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      subText: 'Это Коля',
      avatar: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=PN',
    },
  },
};

export const CallHappenedLeft: Story = {
  args: {
    message: {
      ...message,
      // status: 'read',
      callDuration: '5:00',
    },
  },
};

export const CallHappenedRight: Story = {
  args: {
    message: {
      ...message,
      position: 'right',
      callDuration: '5:00',
    },
  },
};


export const RecallLeft: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      // status: 'read',
      isMissedCall: true,
    },
  },
};

export const RecallRight: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      // status: 'read',
      isMissedCall: true,
    },
  },
};


const dialog = [
  {
    time: '00:00',
    text: 'привет, Вася',
    position: 'right',
  },
  {
    time: '00:05',
    text: 'привет, Петя',
    position: 'left',
  },
  {
    time: '00:10',
    text: 'как дела?',
    position: 'right',
  },
  {
    time: '00:15',
    text: 'все норм',
    position: 'left',
  },
];

export const LeftCallWithTranscript: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      callDuration: '5:00',
      transcript: {
        dialog,
      },
    },
  },
};

export const RightCallWithTranscript: Story = {
  args: {
    message: {
      url: 'https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3',
      position: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      callDuration: '5:00',
      transcript: {
        dialog,
      }
    },
  },
};
