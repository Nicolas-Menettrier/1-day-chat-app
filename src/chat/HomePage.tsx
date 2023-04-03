import { useContext } from 'react';

import MessagesList from './MessagesList';

import SendBox from './interaction/SendBox';

import AppContext from '../context/AppContext';

function HomePage() {
  const { selectedChannel } = useContext(AppContext);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      <div className="flex max-h-[64px] min-h-[64px] items-center gap-2 bg-white text-3xl">
        {selectedChannel}
      </div>
      <hr />
      <div className="flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll p-4">
        <MessagesList />
      </div>
      <hr />
      <div className="flex h-60 w-full flex-col pb-2 pl-4 pr-4 pt-4">
        <SendBox />
      </div>
    </div>
  );
}

export default HomePage;
