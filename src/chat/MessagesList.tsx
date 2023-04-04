import { useContext, useEffect, useMemo, useRef } from 'react';

import { useQuery } from '@apollo/client';

import LoadingScreen from './LoadingScreen';
import MessagesCard from './MessagesCard';
import ErrorScreen from './ErrorScreen';
import NoData from './NoData';

import ReadMore from './interaction/ReadMore';
import ErrorMessageCard from './interaction/ErrorMessageCard';

import AppContext, { Channel, ErrorMessage } from '../context/AppContext';

import { Message, MessagesFetchLatest } from './query/messages.types';
import { GET_MESSAGES } from './query/messages.query';
import usePrevious from './hook/usePrevious';

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
  const endOfMessages = useRef<HTMLDivElement>(null);

  const reversedMessages = useMemo(() => {
    if (messages) {
      return [...messages.MessagesFetchLatest].reverse();
    }
    return [];
  }, [messages]);

  const lastMessageDatetime =
    reversedMessages.length > 0
      ? reversedMessages[reversedMessages.length - 1].datetime
      : null;
  const prevLastMessageDatetime = usePrevious(lastMessageDatetime);

  const userErrorMessages = useMemo(() => {
    return errorMessages.filter(
      (message) =>
        message.channelId === selectedChannel && message.userId === selectedUser
    );
  }, [errorMessages, selectedChannel, selectedUser]);

  useEffect(() => {
    if (
      endOfMessages.current &&
      (!prevLastMessageDatetime ||
        (lastMessageDatetime &&
          new Date(lastMessageDatetime) > new Date(prevLastMessageDatetime)))
    ) {
      endOfMessages.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reversedMessages, lastMessageDatetime, prevLastMessageDatetime]);

  function removeErrorMessage(message: ErrorMessage) {
    setErrorMessages(errorMessages.filter((error) => error.id !== message.id));
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen />
      ) : reversedMessages.length > 0 ? (
        <div>
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
          <section id="end-of-messages" ref={endOfMessages} />
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}

export default MessagesList;
