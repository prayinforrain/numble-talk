import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import {
  CSSProperties,
  InputHTMLAttributes,
  forwardRef,
  Ref,
  ReactElement,
} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  textAlign?: CSSProperties['textAlign'];
  buttonRight?: ReactElement;
  width?: CSSProperties['width'];
}

const InputText = forwardRef(
  (
    { textAlign = 'left', width = '100%', buttonRight, ...props }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <InputWrapper textAlign={textAlign} width={width}>
        <input type="text" {...props} ref={ref} />
        {buttonRight}
      </InputWrapper>
    );
  },
);

interface StyleProps {
  width: CSSProperties['width'];
  textAlign: CSSProperties['textAlign'];
}

const InputWrapper = styled.label<StyleProps>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: 2px solid ${COLOR.gray2};
  border-radius: 5px;

  &:focus-within {
    border: 2px solid ${COLOR.white};
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
