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
  name: Exclude<Users, undefined>;
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

export const USER_MAP: Record<
  Exclude<Users, undefined>,
  { name: Users; avatar: string }
> = {
  Sam: {
    name: 'Sam',
    avatar: USER_LIST[0].avatar,
  },
  Russell: {
    name: 'Russell',
    avatar: USER_LIST[1].avatar,
  },
  Joyse: {
    name: 'Joyse',
    avatar: USER_LIST[2].avatar,
  },
};

export const CHANNEL_LIST: Array<Exclude<Channels, undefined>> = [
  'General',
  'Technology',
  'LGTM',
];

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
