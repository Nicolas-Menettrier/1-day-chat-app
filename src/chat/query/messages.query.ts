import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
} from '@apollo/client';

import { Channel } from '../../context/AppContext';
import {
  MessagePost,
  MessagePostVariables,
  MessagesFetchLatest,
  MessagesFetchMore,
} from './messages.types';

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

export const FETCH_MORE_MESSAGES = gql`
  query MessagesFetchMore(
    $channelId: ChannelId!
    $messageId: String!
    $old: Boolean!
  ) {
    MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      userId
      datetime
    }
  }
`;

export const updateCacheSendMessage =
  (
    selectedChannel: Channel
  ): MutationUpdaterFunction<
    MessagePost,
    MessagePostVariables,
    DefaultContext,
    ApolloCache<any>
  > =>
  (cache, { data }) => {
    const cacheData = cache.readQuery<MessagesFetchLatest>({
      query: GET_MESSAGES,
      variables: { channelId: selectedChannel },
    });

    cache.writeQuery({
      query: GET_MESSAGES,
      variables: { channelId: selectedChannel },
      data: {
        MessagesFetchLatest: [
          data?.MessagePost,
          ...(cacheData?.MessagesFetchLatest || []),
        ],
      },
    });
  };

export const updateCacheFetchMoreMessages = (
  selectedChannel: Channel,
  old: boolean,
  cache: ApolloCache<any>,
  messages: MessagesFetchMore
) => {
  const cacheData = cache.readQuery<MessagesFetchLatest>({
    query: GET_MESSAGES,
    variables: { channelId: selectedChannel },
  });

  cache.writeQuery({
    query: GET_MESSAGES,
    variables: { channelId: selectedChannel },
    data: {
      MessagesFetchLatest: old
        ? [
            ...(cacheData?.MessagesFetchLatest || []),
            ...(messages?.MessagesFetchMore || []),
          ]
        : [
            ...(messages?.MessagesFetchMore || []),
            ...(cacheData?.MessagesFetchLatest || []),
          ],
    },
  });
};
