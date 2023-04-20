import char1 from '@/public/char1.jpg';
import char2 from '@/public/char2.jpg';
import char3 from '@/public/char3.jpg';
import char4 from '@/public/char4.jpg';
import char5 from '@/public/char5.jpg';

const getProfile = (idx: number) => {
  switch (idx) {
    case 1:
      return char1;
    case 2:
      return char2;
    case 3:
      return char3;
    case 4:
      return char4;
    default:
      return char5;
  }
};

export default getProfile;
