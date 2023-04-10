import { ButtonHTMLAttributes, CSSProperties } from 'react';

import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import { IconType } from 'react-icons';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: ButtonVariants;
  padding?: CSSProperties['padding'];
  textColor?: CSSProperties['color'];
  color?: CSSProperties['backgroundColor'];
  width?: CSSProperties['width'];
  margin?: CSSProperties['margin'];
  icon?: IconType;
  fontSize?: CSSProperties['fontSize'];
}

type ButtonVariants = 'filled' | 'outline' | 'text';

const Button = ({
  text = '',
  variant = 'filled',
  color = COLOR.primary,
  textColor = COLOR.black,
  padding = '0.5rem 1rem',
  width = 'auto',
  margin = '0',
  icon: Icon,
  fontSize = '1em',
  ...props
}: Props) => {
  return (
    <ButtonStyle
      variant={variant}
      color={color}
      textColor={textColor}
      padding={padding}
      width={width}
      margin={margin}
      fontSize={fontSize}
      {...props}
    >
      {Icon && <Icon color={textColor} size={fontSize} />}
      {text}
    </ButtonStyle>
  );
};

interface StyleProps {
  variant: ButtonVariants;
  padding: CSSProperties['padding'];
  textColor: CSSProperties['color'];
  color: CSSProperties['backgroundColor'];
  width: CSSProperties['width'];
  margin: CSSProperties['margin'];
  fontSize: CSSProperties['fontSize'];
}
const ButtonStyle = styled.button<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ variant, color }) =>
    variant === 'filled' ? color : 'transparent'};
  border: 1px solid
    ${({ variant, color }) => (variant === 'text' ? 'transparent' : color)};
  border-radius: 5px;
  color: ${({ textColor }) => textColor};
  font-size: ${({ fontSize }) => fontSize};

  ${({ variant }) =>
    variant === 'text' &&
    `
  text-decoration: underline;
  cursor: pointer;
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  `};
  font-weight: bold;
  text-align: center;

  @media (hover: hover) {
    &:hover {
      filter: brightness(1.05);
    }
  }

  &:active {
    filter: brightness(0.95);
  }
`;

export default Button;
