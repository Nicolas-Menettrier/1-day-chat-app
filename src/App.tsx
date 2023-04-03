import { useEffect, useState } from 'react';

import HomePage from './chat/HomePage';
import SideMenu from './sideNavigation/SideMenu';

import AppContext, { Channel, ErrorMessage, User } from './context/AppContext';

function App() {
  const [user, setUser] = useState<User>(
    (localStorage.getItem('user') as User) || 'Sam'
  );
  const [channel, setChannel] = useState<Channel>(
    (localStorage.getItem('channel') as Channel) || 'General'
  );
  const [isMenuOpen, setIsMenuOpen] = useState(
    localStorage.getItem('isMenuOpen') === 'false' ? false : true
  );
  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([]);

  useEffect(() => {
    const messages = localStorage.getItem('errorMessages');

    if (messages) {
      try {
        const errorFormat = JSON.parse(messages);
        setErrorMessages(errorFormat);
      } catch (error) {
        localStorage.removeItem('errorMessages');
      }
    }
  }, []);

  function updateAndSaveInLocalStorage<T>(
    key: string,
    update: React.Dispatch<React.SetStateAction<T>>
  ) {
    return (value: T) => {
      localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      );
      update(value);
    };
  }

  return (
    <AppContext.Provider
      value={{
        selectedUser: user,
        setSelectedUser: updateAndSaveInLocalStorage<User>('user', setUser), // optional generic type because the type is inferred from the setState but I prefer to be explicit
        selectedChannel: channel,
        setSelectedChannel: updateAndSaveInLocalStorage<Channel>(
          'channel',
          setChannel
        ),
        isMenuOpen,
        setIsMenuOpen: updateAndSaveInLocalStorage<boolean>(
          'isMenuOpen',
          setIsMenuOpen
        ),
        errorMessages,
        setErrorMessages: updateAndSaveInLocalStorage<Array<ErrorMessage>>(
          'errorMessages',
          setErrorMessages
        ),
      }}
    >
      <div className="flex h-screen w-screen flex-row">
        <SideMenu />
        <HomePage />
      </div>
    </AppContext.Provider>
  );
}

export default App;
