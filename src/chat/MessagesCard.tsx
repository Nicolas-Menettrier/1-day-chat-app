import { useContext, useMemo } from 'react';

import Avatar from './Avatar';

import AppContext, { User } from '../context/AppContext';

interface IMessageCardProps {
  message: string;
  userId: User;
  datetime: string;
}

function MessagesCard({ message, userId, datetime }: IMessageCardProps) {
  const { selectedUser } = useContext(AppContext);
  const isCurrentUser = useMemo(() => {
    return selectedUser === userId;
  }, [selectedUser, userId]);

  return (
    <div className={`mb-3 flex flex-row ${isCurrentUser ? 'justify-end' : ''}`}>
      {!isCurrentUser && <Avatar user={userId} />}
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : ''}`}>
        <div
          className={`flex w-fit max-w-sm flex-row rounded-md px-3 py-2 ${
            isCurrentUser ? 'mr-2 bg-blue-500' : 'ml-2 bg-gray-400'
          }`}
        >
          <div className="whitespace-pre-wrap text-sm text-white">
            {message}
          </div>
        </div>
        <div className="flex flex-row">
          <span
            className={`${
              isCurrentUser ? 'mr-2' : 'ml-2'
            } text-sm text-gray-500`}
          >
            Sent at {new Date(datetime).toLocaleTimeString()}
          </span>
        </div>
      </div>
      {isCurrentUser && <Avatar user={userId} />}
    </div>
  );
}

export default MessagesCard;
