import { useContext } from 'react';

import { useQuery } from '@apollo/client';

import AppContext, { Channels } from '../context/AppContext';

import {
  GET_MESSAGES,
  Message,
  MessagesFetchLatest,
} from './query/messages.query';
import MessagesCard from './MessagesCard';

function MessagesList() {
  const { selectedChannel } = useContext(AppContext);
  const {
    loading,
    error,
    data: messages,
  } = useQuery<
    MessagesFetchLatest,
    {
      channelId: Channels;
    }
  >(GET_MESSAGES, {
    variables: { channelId: selectedChannel },
  });

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :(</p>
      ) : (
        messages?.MessagesFetchLatest.map((message: Message) => (
          <MessagesCard
            key={message.messageId}
            message={message.text}
            userId={message.userId}
            datetime={message.datetime}
          />
        ))
      )}
    </>
  );
}

export default MessagesList;
