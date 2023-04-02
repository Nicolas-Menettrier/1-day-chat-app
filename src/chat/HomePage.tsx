import { useContext } from 'react';

import AppContext from '../context/AppContext';
import ReadMore from './interaction/ReadMore';
import SendBox from './interaction/SendBox';
import MessagesList from './MessagesList';

function HomePage() {
  const { selectedChannel } = useContext(AppContext);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      <div className="flex  w-full flex-col p-4 text-5xl">
        {selectedChannel}
      </div>
      <hr />
      <ReadMore />
      <div className="flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll p-4">
        <MessagesList />
      </div>
      <ReadMore />
      <div className="flex h-60 w-full flex-col p-4">
        <SendBox />
      </div>
    </div>
  );
}

export default HomePage;
