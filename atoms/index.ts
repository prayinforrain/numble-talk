import { atom } from 'recoil';

import { RoomInfo } from '@/types/roomInfo';

const atomList = atom<RoomInfo[]>({
  key: 'atomList',
  default: [],
});

export { atomList };
