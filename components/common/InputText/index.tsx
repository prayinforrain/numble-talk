import styled from '@emotion/styled';
import {
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  Ref,
} from 'react';

import { COLOR } from '@/constants/color';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  textAlign?: CSSProperties['textAlign'];
  buttonRight?: ReactElement;
  width?: CSSProperties['width'];
  label?: string;
}

const InputText = forwardRef(
  (
    { textAlign = 'left', width = '100%', buttonRight, label, ...props }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <Container width={width}>
        {label && <Label>{label}</Label>}
        <InputWrapper textAlign={textAlign}>
          <input type="text" {...props} ref={ref} />
          {buttonRight}
        </InputWrapper>
      </Container>
    );
  },
);

interface WidthStyleProps {
  width: CSSProperties['width'];
}

const Container = styled.div<WidthStyleProps>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Label = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${COLOR.white};
  font-size: 0.8em;
  margin-left: 5px;
`;

interface WrapperStyleProps {
  textAlign: CSSProperties['textAlign'];
}

const InputWrapper = styled.label<WrapperStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: 1px solid ${COLOR.gray3};
  border-radius: 5px;

  &:focus-within {
    border: 1px solid ${COLOR.white};
  }

  & > input {
    margin: 0.7em 0.5em;
    flex: 1;
    border: none;
    outline: none;
    color: ${COLOR.white};
    background-color: transparent;
    font-weight: 600;
    text-align: ${({ textAlign }) => textAlign};

    &::placeholder {
      color: ${COLOR.gray2};
    }

    &:focus {
      outline: none;
    }
  }
`;

export default InputText;
