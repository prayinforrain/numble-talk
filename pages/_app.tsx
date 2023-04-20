import styled from '@emotion/styled';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import NumbleProvider from '@/components/common/Theme';
import { COLOR } from '@/constants/color';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
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
