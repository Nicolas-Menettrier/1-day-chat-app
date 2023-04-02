import { useContext } from 'react';

import AppContext, {
  Users,
  USER_LIST,
  USER_MAP,
} from '../../context/AppContext';

function UserSelection() {
  const { selectedUser, setSelectedUser, isMenuOpen } = useContext(AppContext);

  function handleUserSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(e.target.value as Users);
  }

  return (
    <div>
      {isMenuOpen && (
        <h2 className="text-1xl font-semibold">1. Choose your user</h2>
      )}
      <div className="flex flex-col gap-2">
        {isMenuOpen ? (
          <select
            className="rounded-md border border-gray-300 p-2 hover:rounded-md"
            value={selectedUser}
            onChange={handleUserSelection}
          >
            <option value="" disabled>
              Select a user
            </option>
            {USER_LIST.map((user) => (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="h-16 w-16 p-2">
            <img
              src={USER_MAP[selectedUser].avatar}
              className="cursor-pointer rounded-md transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </span>
        )}
      </div>
    </div>
  );
}

export default UserSelection;
