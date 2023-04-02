import { gql } from '@apollo/client';

import { Channels, Users } from '../../context/AppContext';

export type Message = {
  messageId: string;
  text: string;
  userId: Users;
  datetime: string;
};

export type MessagesFetchLatest = {
  MessagesFetchLatest: Message[];
};

export const GET_MESSAGES = gql`
  query LatestMessages($channelId: ChannelId!) {
    MessagesFetchLatest(channelId: $channelId) {
      messageId
      text
      userId
      datetime
    }
  }
`;

export type MessagePost = {
  MessagePost: {
    text: string;
    messageId: string;
    datetime: string;
    userId: Users;
  };
};

export type MessagePostVariables = {
  channelId: Channels;
  text: string;
  userId: Users;
};

export const SEND_MESSAGE = gql`
  mutation MessagePost(
    $channelId: ChannelId!
    $text: String!
    $userId: UserId!
  ) {
    MessagePost(channelId: $channelId, text: $text, userId: $userId) {
      text
      messageId
      datetime
      userId
    }
  }
`;
