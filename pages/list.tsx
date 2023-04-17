import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import RoomModify from '@/components/Modals/RoomModify';
import RoomListItem from '@/components/RoomListItem';
import { COLOR } from '@/constants/color';
import { RoomInfo } from '@/types/roomInfo';

const TEST_DATA: RoomInfo[] = [
  {
    id: 1,
    name: '방',
    people: 5,
  },
];

export default function List() {
  const [showNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [modalData, setModalData] = useState<RoomInfo>({
    id: 0,
    name: '',
    people: 0,
  });
  const callModal = (id: number) => {
    console.log(id);
    setShowNewRoomModal(true);
  };

  useEffect(() => {
    console.log('dd');
    setRooms(TEST_DATA);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        {rooms.length ? (
          <>
            <HeaderPadding />
            {rooms.map((r) => (
              <RoomListItem
                key={r.id}
                callModal={callModal}
                id={r.id}
                name={r.name}
                people={r.people}
              />
            ))}
          </>
        ) : (
          <NoRoom>노룸!</NoRoom>
        )}
      </Content>
      <RoomModify
        setShowNewRoomModal={setShowNewRoomModal}
        showNewRoomModal={showNewRoomModal}
        roomData={modalData}
        setRoomData={setModalData}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  max-width: 800px;
  overflow-y: scroll;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const HeaderPadding = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid ${COLOR.gray3};
`;

const NoRoom = styled.div`
  flex: 1;
  color: ${COLOR.white};
  display: flex;
  justify-content: center;
  align-items: center; ;
`;
