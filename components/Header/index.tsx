import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import { COLOR } from '@/constants/color';
import Logo from '@/public/numble_logo.svg';

import Button from '../common/Button';
import RoomAdd from '../Modals/RoomAdd';

const Header = () => {
  const [showNewRoomModal, setShowNewRoomModal] = useState<boolean>(false);
  return (
    <Wrapper>
      <HeaderLeft>
        <Image src={Logo} height={20} alt="service-logo" />
      </HeaderLeft>
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
`;

const HeaderLeft = styled.div``;

export default Header;
