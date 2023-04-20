import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { COLOR } from '@/constants/color';

interface Props {
  isShown: boolean;
  children?: ReactNode;
  onDimmedClick?: () => void;
}

const Modal = ({ isShown, onDimmedClick, children }: Props) => {
  return (
    <>
      {isShown && (
        <>
          <Container>{children}</Container>
          <Dimmed onClick={onDimmedClick} />
        </>
      )}
    </>
  );
};

const Dimmed = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
  z-index: 999;
`;

const Container = styled.div`
  background-color: ${COLOR.gray1};
  position: fixed;
  color: ${COLOR.white};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 5px;
`;

export default Modal;
