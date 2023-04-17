import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';
import { RoomInfo } from '@/types/roomInfo';

import Button from '../common/Button';

interface Props extends RoomInfo {
  callModal: (id: number) => void;
}

const RoomListItem = ({ name, id, callModal }: Props) => {
  return (
    <ItemWrapper>
      <ChatName>{name}</ChatName>
      <Button
        text="수정"
        onClick={() => {
          callModal(id);
        }}
      />
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${COLOR.gray3};
`;

const ChatName = styled.div`
  color: ${COLOR.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default RoomListItem;
