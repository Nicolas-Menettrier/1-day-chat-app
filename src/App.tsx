import { useState } from 'react';

import HomePage from './chat/HomePage';
import SideMenu from './sideNavigation/SideMenu';

import AppContext, { Channels, Users } from './context/AppContext';

function App() {
  const [user, setUser] = useState<Users>('Sam');
  const [channel, setChannel] = useState<Channels>('General');
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <AppContext.Provider
      value={{
        selectedUser: user,
        setSelectedUser: setUser,
        selectedChannel: channel,
        setSelectedChannel: setChannel,
        isMenuOpen,
        setIsMenuOpen,
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
