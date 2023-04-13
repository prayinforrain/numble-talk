import { BsPlusLg } from 'react-icons/bs';
import Button from '../common/Button';
import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import Image from 'next/image';
import Logo from '@/public/numble_logo.svg';
import { useState } from 'react';
import Modal from '../common/Modal';
import InputText from '../common/InputText';

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
      <Modal
        isShown={showNewRoomModal}
        onDimmedClick={() => setShowNewRoomModal(false)}
      >
        <ModalWrapper>
          <InputText label="방 이름" />
          <InputText label="방 인원" />
        </ModalWrapper>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const HeaderLeft = styled.div``;

const ModalWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

export default Header;
