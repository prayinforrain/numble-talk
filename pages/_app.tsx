import type { AppProps } from 'next/app';

import NumbleProvider from '@/components/common/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NumbleProvider>
        <Component {...pageProps} />;
      </NumbleProvider>
    </>
  );
}
