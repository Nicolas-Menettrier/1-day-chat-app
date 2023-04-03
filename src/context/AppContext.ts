import { createContext } from 'react';

import { Message } from '../chat/query/messages.types';

export type ErrorMessage = Omit<Message, 'messageId' | 'datetime'> & {
  channelId: Channel;
  id: string;
};

interface IAppContext {
  selectedUser: User;
  setSelectedUser: (user: User) => void;
  selectedChannel: Channel;
  setSelectedChannel: (channel: Channel) => void;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
  errorMessages: Array<ErrorMessage>;
  setErrorMessages: (errorMessages: Array<ErrorMessage>) => void;
}

export type User = 'Sam' | 'Russell' | 'Joyse';
export type Channel = 'General' | 'Technology' | 'LGTM';

export const USER_LIST: Array<{
  name: User;
  avatar: string;
}> = [
  {
    name: 'Sam',
    avatar:
      'https://static.vecteezy.com/ti/vecteur-libre/p3/2275847-male-avatar-profil-icone-de-souriant-caucasien-homme-vectoriel.jpg',
  },
  {
    name: 'Russell',
    avatar:
      'https://static.vecteezy.com/ti/vecteur-libre/p2/4819319-dessin-anime-avatar-de-sourire-barbe-homme-profil-icone-vectoriel.jpg',
  },
  {
    name: 'Joyse',
    avatar:
      'https://static.vecteezy.com/ti/vecteur-libre/p2/4819318-femme-blonde-avatar-profil-icone-de-fille-souriante-vectoriel.jpg',
  },
];

export const USER_MAP: Record<User, { name: User; avatar: string }> =
  USER_LIST.reduce((acc, user) => {
    acc[user.name] = user;
    return acc;
  }, {} as Record<User, { name: User; avatar: string }>);

export const CHANNEL_LIST: Array<Channel> = ['General', 'Technology', 'LGTM'];

export const defaultAppContextValue: IAppContext = {
  selectedUser: 'Sam',
  setSelectedUser: () => {},
  selectedChannel: 'General',
  setSelectedChannel: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  errorMessages: [],
  setErrorMessages: () => {},
};

const AppContext = createContext(defaultAppContextValue);

export default AppContext;
