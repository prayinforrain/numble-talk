import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { useRecoilState } from 'recoil';

import { atomList } from '@/atoms';
import { COLOR } from '@/constants/color';
import { RoomInfo } from '@/types/roomInfo';

import Button from '../common/Button';
import InputText from '../common/InputText';
import Modal from '../common/Modal';

interface Props {
  showNewRoomModal: boolean;
  setShowNewRoomModal: Dispatch<SetStateAction<boolean>>;
}

const RoomAdd = ({ showNewRoomModal, setShowNewRoomModal }: Props) => {
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

  const getNewId = () => {
    if (!globalList.length) return 1;
    else return globalList[globalList.length - 1].id + 1;
  };

  const onSubmit = () => {
    const arr = globalList.slice();
    const id = getNewId();
    arr.push({ ...modalData, id: id });
    localStorage.setItem('list', JSON.stringify(arr));
    localStorage.setItem(`room${id}`, '[]');
    setGlobalList(arr);
    close();
  };

  const close = () => {
    setModalData({ id: 0, name: '', people: 1 });
    setShowNewRoomModal(false);
  };

  return (
    <Modal isShown={showNewRoomModal} onDimmedClick={close}>
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
            text="생성"
            width="100%"
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

export default RoomAdd;
