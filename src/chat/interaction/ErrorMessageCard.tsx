import { useMutation } from '@apollo/client';

import Avatar from '../Avatar';

import { ErrorMessage } from '../../context/AppContext';

import { SEND_MESSAGE, updateCacheSendMessage } from '../query/messages.query';
import { MessagePost, MessagePostVariables } from '../query/messages.types';

interface IErrorMessageCardProps {
  errorMessage: ErrorMessage;
  removeErrorMessage: (errorMessage: ErrorMessage) => void;
}

function ErrorMessageCard({
  errorMessage,
  removeErrorMessage,
}: IErrorMessageCardProps) {
  const [sendMessage, { loading }] = useMutation<
    MessagePost,
    MessagePostVariables
  >(SEND_MESSAGE, {
    update: updateCacheSendMessage(errorMessage.channelId),
  });

  async function handleResend() {
    try {
      await sendMessage({
        variables: {
          channelId: errorMessage.channelId,
          userId: errorMessage.userId,
          text: errorMessage.text,
        },
      });
      removeErrorMessage(errorMessage);
    } catch (error) {
      console.error('Error resending message:', error); // catch and do nothing
    }
  }

  return (
    <div className="mb-3 flex  flex-row justify-end">
      <div className="mr-2 flex flex-col items-end">
        <div className="flex flex-row">
          <span
            className={`${
              loading ? 'text-gray-500' : 'text-red-500'
            } ml-2 text-sm `}
          >
            {loading ? 'Resending ...' : 'Error'}
          </span>
        </div>
        <button
          className={`${
            loading
              ? 'border-gray-600 bg-gray-300'
              : 'border-red-600 bg-red-300'
          } flex w-fit max-w-sm cursor-pointer flex-row rounded-md border px-3 py-2 text-left`}
          onClick={handleResend}
          disabled={loading}
          title="Resend?"
        >
          <span className="whitespace-pre-wrap text-sm text-gray-700">
            {errorMessage.text}
          </span>
        </button>
      </div>
      <Avatar user={errorMessage.userId} />
    </div>
  );
}

export default ErrorMessageCard;
