import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Main from '@/components/layouts/Main';
import { SWRConfig } from 'swr';
import api from '@/services/api';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const GetProviders = ({ children, emotionCache }) => {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <SWRConfig
          value={{
            // refreshInterval: 2000,
            fetcher: ({ url, params }) =>
              api.get(url, { params: { ...params } }).then((res) => res.data),
          }}
        >
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SWRConfig>
      </CacheProvider>
    </>
  );
};

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => <Main>{page}</Main>);
  return (
    <GetProviders emotionCache={emotionCache}>
      {getLayout(<Component {...pageProps} />)}
    </GetProviders>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
