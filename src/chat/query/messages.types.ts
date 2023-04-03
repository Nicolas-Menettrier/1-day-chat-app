import { Channel, User } from '../../context/AppContext';

export type Message = {
  messageId: string;
  text: string;
  userId: User;
  datetime: string;
};

export type MessagesFetchLatest = {
  MessagesFetchLatest: Message[];
};

export type MessagePost = {
  MessagePost: {
    text: string;
    messageId: string;
    datetime: string;
    userId: User;
  };
};

export type MessagePostVariables = {
  channelId: Channel;
  text: string;
  userId: User;
};

export type MessagesFetchMore = {
  MessagesFetchMore: Array<{
    messageId: string;
    text: string;
    userId: string;
    datetime: string;
  }>;
};

export type MessagesFetchMoreVariables = {
  channelId: string;
  messageId: string;
  old: boolean;
};
