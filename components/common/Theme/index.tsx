import { ThemeProvider as Provider } from '@emotion/react';
import { ReactNode } from 'react';

import { COLOR } from '@/constants/color';

interface Props {
  children?: ReactNode;
}

interface Theme {
  color: typeof COLOR;
}

const theme: Theme = {
  color: COLOR,
} as const;

const NumbleProvider = ({ children }: Props) => {
  return <Provider theme={theme}>{children}</Provider>;
};

export default NumbleProvider;
