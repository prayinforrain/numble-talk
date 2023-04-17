import { BsPlusLg, BsXLg } from 'react-icons/bs';
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
          <ButtonContainer>
            <Button
              icon={BsXLg}
              textColor={COLOR.gray4}
              color="transparent"
              fontSize="20px"
              padding={0}
              onClick={() => {
                setShowNewRoomModal(true);
              }}
            />
          </ButtonContainer>
          <FormContainer>
            <InputText label="방 이름" textAlign="right" />
            <InputText label="방 인원" textAlign="right" />
          </FormContainer>
          <ButtonContainer>
            <Button
              text="삭제"
              color={COLOR.error}
              width="fit-content"
              padding="0.3rem 0.8rem"
            />
            <Button text="수정" width="fit-content" padding="0.3rem 0.8rem" />
          </ButtonContainer>
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
  padding: 20px 20px;
`;

const HeaderLeft = styled.div``;

const ModalWrapper = styled.div`
  width: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Header;
