import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { AuthProvider } from '@lib/auth';
import { Global, css } from '@emotion/react';
import theme from '@styles/theme';
import { AppProps } from 'next/app';

const GlobalStyles = () => {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: inherit;
          }

          html {
            padding: 0;
            margin: 0;
            scroll-behavior: smooth;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
    </>
  );
};

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Okie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
