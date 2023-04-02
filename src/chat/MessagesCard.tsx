import { Users } from '../context/AppContext';

interface IMessageCardProps {
  message: string;
  userId: Users;
  datetime: string;
}

function MessagesCard({ message, userId, datetime }: IMessageCardProps) {
  // should display the message in a bubble chat with the time displayed bellow it
  // + the avatar of the user who sent the message
  return (
    <div className="mb-3 flex flex-row">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-900">
        <span className="text-xl font-bold text-white">{userId[0]}</span>
      </div>
      <div className="ml-2 flex flex-col">
        <div className="flex flex-row">
          <span className="text-sm font-bold text-gray-700">{userId}</span>
          <span className="ml-2 text-sm text-gray-500">{datetime}</span>
        </div>
        <div className="flex flex-row rounded-md bg-red-300 px-3 py-2">
          <span className="text-sm text-gray-700">{message}</span>
        </div>
      </div>
    </div>
  );
}

export default MessagesCard;
