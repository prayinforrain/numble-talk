import type { AppProps } from 'next/app';

import NumbleProvider from '@/components/common/Theme';
import styled from '@emotion/styled';
import { COLOR } from '@/constants/color';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NumbleProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </NumbleProvider>
    </>
  );
}

const Wrapper = styled.div`
  background-color: ${COLOR.black};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
