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
  errorMessage?: string;
}

const InputText = forwardRef(
  (
    {
      textAlign = 'left',
      width = '100%',
      buttonRight,
      label,
      errorMessage,
      ...props
    }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <Container width={width}>
        {label && <Label>{label}</Label>}
        <InputWrapper textAlign={textAlign}>
          <input type="text" {...props} ref={ref} />
          {buttonRight}
        </InputWrapper>
        {errorMessage && <Error>{errorMessage}</Error>}
      </Container>
    );
  },
);

InputText.displayName = 'InputText';

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
  position: relative;
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

const Error = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${COLOR.error};
  font-size: 0.8em;
  margin-left: 5px;
  position: absolute;
  bottom: -1.2rem;
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
  padding: 0 0.5rem;

  border: 1px solid ${COLOR.gray3};
  border-radius: 5px;

  &:focus-within {
    border: 1px solid ${COLOR.white};
  }

  & > input {
    margin: 1em 0;
    flex: 1;
    border: none;
    outline: none;
    color: ${COLOR.white};
    background-color: transparent;
    font-weight: 600;
    text-align: ${({ textAlign }) => textAlign};

    &::placeholder {
      color: ${COLOR.gray3};
    }

    &:focus {
      outline: none;
    }
  }
`;

export default InputText;
