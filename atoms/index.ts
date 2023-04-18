import { atom } from 'recoil';

import { RoomInfo } from '@/types/roomInfo';

const atomList = atom<RoomInfo[]>({
  key: 'atomList',
  default: [],
});

const atomApiKey = atom<string>({
  key: 'API_KEY',
  default: '',
});

export { atomApiKey, atomList };
