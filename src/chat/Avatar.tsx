import { User, USER_MAP } from '../context/AppContext';

interface IAvatarProps {
  user: User;
}

function Avatar({ user }: IAvatarProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        className="h-10 w-10 rounded-full"
        src={USER_MAP[user].avatar}
        alt={user}
      />
      <span className="text-sm font-bold text-gray-700">{user}</span>
    </div>
  );
}

export default Avatar;
