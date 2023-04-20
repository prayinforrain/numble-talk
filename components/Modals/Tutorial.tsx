import styled from '@emotion/styled';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { BsXLg } from 'react-icons/bs';

import { COLOR } from '@/constants/color';
import pic1 from '@/public/key1.png';
import pic2 from '@/public/key2.png';

import Button from '../common/Button';
import Modal from '../common/Modal';

interface Props {
  showNewRoomModal: boolean;
  setShowNewRoomModal: Dispatch<SetStateAction<boolean>>;
}

const Tutorial = ({ showNewRoomModal, setShowNewRoomModal }: Props) => {
  const close = () => {
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
        <Instruction>
          <li>
            <div>
              <a href="https://platform.openai.com/account/api-keys">
                [이 링크]
              </a>
              에 접속합니다.
            </div>
          </li>
          <li>
            <div>
              <em>Create new secret key</em> 버튼을 눌러 새 키를 발급합니다.
            </div>
            <ImageContainer>
              <Image
                src={pic1}
                alt="create new key"
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
            </ImageContainer>
          </li>
          <li>
            발급받은 새 키를 복사합니다.
            <ImageContainer>
              <Image
                src={pic2}
                alt="new key"
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
            </ImageContainer>
          </li>
        </Instruction>
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.div`
  width: 600px;
  max-width: 90vw;
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

const Instruction = styled.ol`
  list-style: decimal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & a {
    color: ${COLOR.primary};
  }

  & em {
    font-style: italic;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.6;
`;

export default Tutorial;
