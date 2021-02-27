import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { AuthProvider } from '@lib/auth';
import { Global, css } from '@emotion/react';
import theme from '@styles/theme';
import { AppProps } from 'next/app';
import Layout from '@components/Layout';

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

          ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: #edf2f7;
            border: 4px solid transparent;
            background-clip: content-box;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #5094f0;
            /* border: 1px solid rgb(0, 0, 0); */
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
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
        <title>GiTrack</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
