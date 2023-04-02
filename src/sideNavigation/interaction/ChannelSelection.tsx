import { useContext } from 'react';

import AppContext, { CHANNEL_LIST } from '../../context/AppContext';

function ChannelSelection() {
  const { selectedChannel, setSelectedChannel, isMenuOpen } =
    useContext(AppContext);

  return (
    <>
      {isMenuOpen ? (
        <>
          <h2 className="text-1xl font-semibold">2. Choose your channel</h2>
          <ul className="flex flex-col gap-2">
            <li>
              {CHANNEL_LIST.map((channel) => (
                <button
                  key={channel}
                  className={`mt-1 w-full p-2 text-left ${
                    selectedChannel === channel
                      ? 'bg-gray-200'
                      : 'hover:bg-gray-100'
                  } rounded-md transition-all duration-300 ease-in-out`}
                  onClick={() => setSelectedChannel(channel)}
                >
                  <span>{channel} Channel</span>
                </button>
              ))}
            </li>
          </ul>
        </>
      ) : (
        <div className="flex h-16 w-16  p-2">
          <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-gray-300 text-3xl font-bold text-gray-600 transition-transform duration-300 ease-in-out hover:scale-110">
            {selectedChannel.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </>
  );
}

export default ChannelSelection;
