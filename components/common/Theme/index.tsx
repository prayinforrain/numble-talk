import { Global, ThemeProvider as Provider } from '@emotion/react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import { COLOR } from '@/constants/color';
import GlobalStyle from '@/styles/global';

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
  return (
    <RecoilRoot>
      <Global styles={GlobalStyle} />
      <Provider theme={theme}>{children}</Provider>
    </RecoilRoot>
  );
};

export default NumbleProvider;
