import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { BsXLg } from 'react-icons/bs';

import { COLOR } from '@/constants/color';

import Button from '../common/Button';
import InputText from '../common/InputText';
import Modal from '../common/Modal';

interface Props {
  showNewRoomModal: boolean;
  setShowNewRoomModal: Dispatch<SetStateAction<boolean>>;
}

const RoomAdd = ({ showNewRoomModal, setShowNewRoomModal }: Props) => {
  return (
    <Modal
      isShown={showNewRoomModal}
      onDimmedClick={() => setShowNewRoomModal(false)}
    >
      <ModalHeader>
        <Button
          icon={BsXLg}
          textColor={COLOR.gray4}
          color="transparent"
          fontSize="20px"
          padding={0}
          onClick={() => {
            setShowNewRoomModal(false);
          }}
        />
      </ModalHeader>
      <ModalWrapper>
        <FormContainer>
          <InputText label="방 이름" textAlign="right" />
          <InputText label="방 인원" textAlign="right" type="number" />
        </FormContainer>
        <ButtonContainer>
          <Button text="생성" width="100%" padding="0.3rem 0.8rem" />
        </ButtonContainer>
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  padding: 10px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 10px;
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

export default RoomAdd;
