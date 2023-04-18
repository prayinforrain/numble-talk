import styled from '@emotion/styled';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { BsXLg } from 'react-icons/bs';
import { useRecoilState } from 'recoil';

import { atomList } from '@/atoms';
import { COLOR } from '@/constants/color';
import { RoomInfo } from '@/types/roomInfo';

import Button from '../common/Button';
import InputText from '../common/InputText';
import Modal from '../common/Modal';

interface Props {
  showModifyRoomModal: boolean;
  setShowModifyRoomModal: Dispatch<SetStateAction<boolean>>;
  roomData: RoomInfo;
}

const RoomModify = ({
  roomData,
  showModifyRoomModal,
  setShowModifyRoomModal,
}: Props) => {
  const [modalData, setModalData] = useState<RoomInfo>({
    id: 0,
    name: '',
    people: 1,
  });
  const [globalList, setGlobalList] = useRecoilState(atomList);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setModalData({
      ...modalData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    setModalData(roomData);
  }, [roomData]);

  const onSubmit = () => {
    const toChange = globalList.findIndex((r) => r.id === roomData.id);
    const arr = globalList.slice();
    arr[toChange] = modalData;
    localStorage.setItem('list', JSON.stringify(arr));
    setGlobalList(arr);
    close();
  };

  const onDelete = () => {
    const arr = globalList.filter((r) => r.id !== roomData.id);
    localStorage.setItem('list', JSON.stringify(arr));
    localStorage.removeItem(`room${roomData.id}`);
    setGlobalList(arr);
    close();
  };

  const close = () => {
    setModalData({ id: 0, name: '', people: 1 });
    setShowModifyRoomModal(false);
  };

  return (
    <Modal isShown={showModifyRoomModal} onDimmedClick={close}>
      <ModalHeader>
        <Button
          icon={BsXLg}
          textColor={COLOR.gray4}
          color="transparent"
          fontSize="20px"
          padding={0}
          onClick={close}
        />
      </ModalHeader>
      <ModalWrapper>
        <FormContainer>
          <InputText
            label="방 이름"
            textAlign="right"
            value={modalData.name}
            onChange={onChange}
            name="name"
          />
          <InputText
            label="방 인원"
            textAlign="right"
            value={modalData.people}
            onChange={onChange}
            type="number"
            name="people"
          />
        </FormContainer>
        <ButtonContainer>
          <Button
            text="삭제"
            color={COLOR.error}
            width="fit-content"
            padding="0.3rem 0.8rem"
            onClick={onDelete}
          />
          <Button
            text="수정"
            width="fit-content"
            padding="0.3rem 0.8rem"
            onClick={onSubmit}
          />
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
