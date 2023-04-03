import { useContext, useMemo } from 'react';

import { useQuery } from '@apollo/client';

import MessagesCard from './MessagesCard';
import ReadMore from './interaction/ReadMore';

import AppContext, { Channel, ErrorMessage } from '../context/AppContext';

import { Message, MessagesFetchLatest } from './query/messages.types';
import { GET_MESSAGES } from './query/messages.query';
import ErrorMessageCard from './interaction/ErrorMessageCard';

function MessagesList() {
  const { selectedChannel, errorMessages, setErrorMessages, selectedUser } =
    useContext(AppContext);
  const {
    loading,
    error,
    data: messages,
  } = useQuery<
    MessagesFetchLatest,
    {
      channelId: Channel;
    }
  >(GET_MESSAGES, {
    variables: { channelId: selectedChannel },
  });

  const reversedMessages = useMemo(() => {
    if (messages) {
      return [...messages.MessagesFetchLatest].reverse();
    }
    return [];
  }, [messages]);

  const userErrorMessages = useMemo(() => {
    return errorMessages.filter(
      (message) =>
        message.channelId === selectedChannel && message.userId === selectedUser
    );
  }, [errorMessages, selectedChannel, selectedUser]);

  const removeErrorMessage = (message: ErrorMessage) => {
    setErrorMessages(errorMessages.filter((error) => error.id !== message.id));
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :(</p>
      ) : reversedMessages.length > 0 ? (
        <>
          <ReadMore
            old
            messageId={reversedMessages[0].messageId}
            channel={selectedChannel}
          />
          {reversedMessages.map((message: Message) => (
            <MessagesCard
              key={message.messageId}
              message={message.text}
              userId={message.userId}
              datetime={message.datetime}
            />
          ))}
          {userErrorMessages.map((message) => (
            <ErrorMessageCard
              errorMessage={message}
              removeErrorMessage={removeErrorMessage}
            />
          ))}
          <ReadMore
            old={false}
            messageId={reversedMessages[reversedMessages.length - 1].messageId}
            channel={selectedChannel}
          />
        </>
      ) : (
        <>no data</>
      )}
    </>
  );
}

export default MessagesList;
