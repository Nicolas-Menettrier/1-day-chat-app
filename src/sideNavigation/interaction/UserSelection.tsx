import { useContext } from 'react';

import AppContext, {
  User,
  USER_LIST,
  USER_MAP,
} from '../../context/AppContext';

function UserSelection() {
  const { selectedUser, setSelectedUser, isMenuOpen, setIsMenuOpen } =
    useContext(AppContext);

  function handleUserSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(e.target.value as User);
  }

  return (
    <div>
      {isMenuOpen && (
        <h2 className="text-1xl p-2 font-semibold">1. Choose your user</h2>
      )}
      <div
        className={`flex flex-row flex-wrap gap-2 ${isMenuOpen ? 'p-2' : ''}`}
      >
        {isMenuOpen ? (
          <>
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
            <img
              src={USER_MAP[selectedUser].avatar}
              title={selectedUser}
              className="h-8 w-8 rounded-md"
            />
          </>
        ) : (
          <button
            className="h-16 w-16 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src={USER_MAP[selectedUser].avatar}
              title={selectedUser}
              className="cursor-pointer rounded-md transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default UserSelection;
