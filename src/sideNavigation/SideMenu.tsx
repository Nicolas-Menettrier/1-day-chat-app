import { useContext } from 'react';

import ChannelSelection from './interaction/ChannelSelection';
import HamburgerToggle from './interaction/HamburgerToggle';
import UserSelection from './interaction/UserSelection';

import AppContext from '../context/AppContext';

function SideMenu(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);

  return (
    <aside
      className={`top transition-width flex h-screen w-16 flex-col  bg-white  duration-300 ease-in-out ${
        !isMenuOpen
          ? 'w-16 sm:w-16 md:w-16 lg:w-16'
          : 'w-64 sm:w-64 md:w-64 lg:w-64'
      }`}
    >
      <span
        className={`flex h-16 items-center gap-2  ${
          !isMenuOpen ? 'justify-center' : 'pl-2'
        }`}
      >
        <HamburgerToggle
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />
        {isMenuOpen && <h1 className="text-xl font-bold">Chat</h1>}
      </span>
      <hr />
      <ul className={isMenuOpen ? 'p-2' : ''}>
        <li>
          <UserSelection />
        </li>
        <li className="mt-4">
          <ChannelSelection />
        </li>
      </ul>
    </aside>
  );
}

export default SideMenu;
