import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsChevronLeft, BsPlusLg } from 'react-icons/bs';

import { COLOR } from '@/constants/color';
import Logo from '@/public/numble_logo.svg';

import Button from '../common/Button';
import RoomAdd from '../Modals/RoomAdd';

interface Props {
  roomName?: string;
}

const Header = ({ roomName }: Props) => {
  const [showNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Wrapper>
      <HeaderLeft>
        {roomName ? (
          <Button
            icon={BsChevronLeft}
            text={roomName}
            textColor={COLOR.white}
            variant="text"
            padding={0}
            onClick={() => {
              router.push('/list');
            }}
          />
        ) : (
          <Image src={Logo} height={20} alt="service-logo" />
        )}
      </HeaderLeft>
      {!roomName && (
        <>
          <Button
            icon={BsPlusLg}
            textColor={COLOR.white}
            color={COLOR.black}
            fontSize="26px"
            padding={0}
            onClick={() => {
              setShowNewRoomModal(true);
            }}
          />
          <RoomAdd
            setShowNewRoomModal={setShowNewRoomModal}
            showNewRoomModal={showNewRoomModal}
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  position: fixed;
  top: 0;
  background-color: ${COLOR.black};
  border-bottom: 2px solid ${COLOR.gray3};
  z-index: 1;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${COLOR.white};
  gap: 10px;
  font-size: 1.2rem;
  & * {
    text-decoration: none !important;
  }
`;

export default Header;
