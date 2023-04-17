import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { BsXLg } from 'react-icons/bs';

import { COLOR } from '@/constants/color';
import { RoomInfo } from '@/types/roomInfo';

import Button from '../common/Button';
import InputText from '../common/InputText';
import Modal from '../common/Modal';

interface Props {
  showNewRoomModal: boolean;
  setShowNewRoomModal: Dispatch<SetStateAction<boolean>>;
  roomData: RoomInfo;
  setRoomData: Dispatch<SetStateAction<RoomInfo>>;
}

const RoomModify = ({
  roomData,
  setRoomData,
  showNewRoomModal,
  setShowNewRoomModal,
}: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    console.log(roomData);
    setRoomData({
      ...roomData,
      [target.name]: target.value,
    });
  };
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
          <InputText
            label="방 이름"
            textAlign="right"
            value={roomData.name}
            onChange={onChange}
            name="name"
          />
          <InputText
            label="방 인원"
            textAlign="right"
            value={roomData.people}
            onChange={onChange}
            name="people"
          />
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

export default RoomModify;
