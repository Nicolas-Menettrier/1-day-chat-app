import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

import AppContext from '../../context/AppContext';

import { SEND_MESSAGE, updateCacheSendMessage } from '../query/messages.query';
import { MessagePost, MessagePostVariables } from '../query/messages.types';

function SendBox() {
  const { selectedUser, selectedChannel, errorMessages, setErrorMessages } =
    useContext(AppContext);
  const [sendMessage, { data, loading, error }] = useMutation<
    MessagePost,
    MessagePostVariables
  >(SEND_MESSAGE, {
    update: updateCacheSendMessage(selectedChannel),
    onError: (error) => {
      setErrorMessages([
        ...errorMessages,
        {
          text: message,
          userId: selectedUser,
          channelId: selectedChannel,
          id: Math.floor(Math.random() * 100000).toString(),
        },
      ]);
      localStorage.setItem('message', '');
    },
  });
  const [message, setMessage] = useState(localStorage.getItem('message') || '');

  async function handleSend() {
    if (message.trim() !== '') {
      await sendMessage({
        variables: {
          channelId: selectedChannel,
          userId: selectedUser,
          text: message.trim(),
        },
      });
      setMessage('');

      localStorage.setItem('message', '');
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
    localStorage.setItem('message', event.target.value);
  }

  return (
    <div className="flex flex-col">
      <textarea
        className="w-full resize-none rounded-lg border border-gray-300 p-2"
        placeholder="Type your message here..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={4}
      />
      <button
        className={`${
          loading
            ? 'bg-gray-200'
            : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        } ml-auto mt-2 w-full rounded-md  p-2 py-2 text-sm font-medium text-white  sm:w-full md:w-32`}
        onClick={handleSend}
        disabled={loading}
      >
        Send Message
      </button>
    </div>
  );
}

export default SendBox;
