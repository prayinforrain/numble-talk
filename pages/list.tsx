import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { atomApiKey, atomList } from '@/atoms';
import Header from '@/components/Header';
import RoomModify from '@/components/Modals/RoomModify';
import RoomListItem from '@/components/RoomListItem';
import { COLOR } from '@/constants/color';
import { RoomInfo } from '@/types/roomInfo';

export default function List() {
  const [showModifyRoomModal, setShowModifyRoomModal] =
    useState<boolean>(false);
  const [rooms, setRooms] = useRecoilState<RoomInfo[]>(atomList);
  const [modalData, setModalData] = useState<RoomInfo>({
    id: 0,
    name: '',
    people: 0,
  });
  const API_KEY = useRecoilValue(atomApiKey);
  const router = useRouter();

  const callModal = (id: number) => {
    const data = rooms.find((r) => r.id === id);
    if (!data) return;
    setModalData(data);
    setShowModifyRoomModal(true);
  };

  useEffect(() => {
    if (API_KEY.length !== 51) {
      router.push('/');
      return;
    }
    fetchList();
  }, []);

  const fetchList = () => {
    const storageData = localStorage.getItem('list');
    if (!storageData) {
      localStorage.setItem('list', '[]');
      return;
    }
    setRooms(JSON.parse(storageData));
  };

  useEffect(() => {
    if (showModifyRoomModal) return;
  }, [modalData]);

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
          <NoRoom>
            채팅방이 없습니다.
            <br /> 상단의 + 버튼을 눌러 새 방을 만들어보세요!
          </NoRoom>
        )}
      </Content>
      <RoomModify
        setShowModifyRoomModal={setShowModifyRoomModal}
        showModifyRoomModal={showModifyRoomModal}
        roomData={modalData}
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
`;

const NoRoom = styled.div`
  flex: 1;
  color: ${COLOR.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5rem;
`;
