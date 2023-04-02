import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

import AppContext from '../../context/AppContext';
import {
  MessagePost,
  MessagePostVariables,
  MessagesFetchLatest,
  GET_MESSAGES,
  SEND_MESSAGE,
} from '../query/messages.query';

function SendBox() {
  const { selectedUser, selectedChannel } = useContext(AppContext);
  const [sendMessage, { data, loading, error }] = useMutation<
    MessagePost,
    MessagePostVariables
  >(SEND_MESSAGE, {
    update(cache, { data }) {
      // Read the data from the cache for the messages in the selected channel
      const cacheData = cache.readQuery<MessagesFetchLatest>({
        query: GET_MESSAGES,
        variables: { channelId: selectedChannel },
      });

      // Update the cache with the new message
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
    },
  });
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      sendMessage({
        variables: {
          channelId: selectedChannel,
          userId: selectedUser,
          text: message.trim(),
        },
      });

      setMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        className="w-full resize-none rounded-lg border border-gray-300 p-2"
        placeholder="Type your message here..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
      />
      <button
        className="ml-auto mt-2 w-full rounded-md bg-blue-500 p-2 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-full md:w-32"
        onClick={handleSend}
      >
        Send Message
      </button>
    </div>
  );
}

export default SendBox;
