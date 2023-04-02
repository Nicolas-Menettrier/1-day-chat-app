import { createContext } from 'react';

interface IAppContext {
  selectedUser: Users;
  setSelectedUser: (user: Users) => void;
  selectedChannel: Channels;
  setSelectedChannel: (channel: Channels) => void;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
}

export type Users = 'Sam' | 'Russell' | 'Joyse';
export type Channels = 'General' | 'Technology' | 'LGTM';

export const USER_LIST: Array<{
  name: Users;
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

export const USER_MAP: Record<Users, { name: Users; avatar: string }> =
  USER_LIST.reduce((acc, user) => {
    acc[user.name] = user;
    return acc;
  }, {} as Record<Users, { name: Users; avatar: string }>);

export const CHANNEL_LIST: Array<Channels> = ['General', 'Technology', 'LGTM'];

export const defaultAppContextValue: IAppContext = {
  selectedUser: 'Sam',
  setSelectedUser: () => {},
  selectedChannel: 'General',
  setSelectedChannel: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
};

const AppContext = createContext(defaultAppContextValue);

export default AppContext;
