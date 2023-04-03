import { useApolloClient, useLazyQuery } from '@apollo/client';

import { Channel } from '../../context/AppContext';

import {
  FETCH_MORE_MESSAGES,
  updateCacheFetchMoreMessages,
} from '../query/messages.query';
import {
  MessagesFetchMore,
  MessagesFetchMoreVariables,
} from '../query/messages.types';

interface IReadMoreProps {
  old: boolean;
  messageId: string;
  channel: Channel;
}

function ReadMore({ old, messageId, channel }: IReadMoreProps) {
  const client = useApolloClient();
  const [fetchMoreMessages, { loading }] = useLazyQuery<
    MessagesFetchMore,
    MessagesFetchMoreVariables
  >(FETCH_MORE_MESSAGES, {
    onCompleted: (data) => {
      updateCacheFetchMoreMessages(channel, old, client.cache, data);
    },
  });

  const handleClick = () => {
    fetchMoreMessages({
      variables: {
        channelId: channel,
        messageId,
        old,
      },
    });
  };

  return (
    <button
      className={`${
        old ? 'mb-4' : ''
      } flex w-fit items-center rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
      id={messageId}
      onClick={handleClick}
      disabled={loading}
    >
      <span>Read More</span>
      {old ? (
        <span className="ml-1">&#x25B2;</span>
      ) : (
        <span className="ml-1">&#x25BC;</span>
      )}
    </button>
  );
}

export default ReadMore;
