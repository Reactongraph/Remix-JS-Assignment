import {PassThrough} from 'stream';
import {resolve} from 'node:path';

import createEmotionCache from '@emotion/cache';
import {CacheProvider as EmotionCacheProvider} from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type {EntryContext} from '@remix-run/node';
import {RemixServer} from '@remix-run/react';
import {isbot} from 'isbot';
import {renderToPipeableStream} from 'react-dom/server';
import {createInstance, i18n as I18n} from 'i18next';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import Backend from 'i18next-fs-backend';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '~/global/components/mui/theme';

import i18n from '~/localization/i18n';
import i18next from '~/localization/i18n.server';

const ABORT_DELAY = 5000;

const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) => {
  const instance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {loadPath: '/locales/{{lng}}/{{ns}}.json'},
    });

  return isbot(request.headers.get('user-agent'))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext, instance)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext, instance);
};

const handleRender = (
  request: Request,
  responseHeaders: Headers,
  remixContext: EntryContext,
  i18nInstance: I18n,
) => {
  const emotionCache = createEmotionCache({key: 'css'});
  const emotionServer = createEmotionServer(emotionCache);
  const reactBody = new PassThrough();

  return {emotionCache, emotionServer, reactBody};
};

const handleBotRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  i18nInstance: I18n,
) =>
  new Promise((resolve, reject) => {
    let didError = false;
    const {emotionCache, emotionServer, reactBody} = handleRender(
      request,
      responseHeaders,
      remixContext,
      i18nInstance,
    );

    const {pipe, abort} = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <EmotionCacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RemixServer context={remixContext} url={request.url} />
          </ThemeProvider>
        </EmotionCacheProvider>
      </I18nextProvider>,
      {
        onAllReady: () => {
          const bodyWithStyles = emotionServer.renderStylesToNodeStream();
          reactBody.pipe(bodyWithStyles);
          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(bodyWithStyles as any, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(reactBody);
        },
        onShellError: (error: unknown) => {
          console.error('Shell Error:', error);
          reject(error);
        },
        onError: (error: unknown) => {
          didError = true;
          console.error('Render Error:', error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });

const handleBrowserRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  i18nInstance: I18n,
) =>
  new Promise((resolve, reject) => {
    let didError = false;
    const {emotionCache, emotionServer, reactBody} = handleRender(
      request,
      responseHeaders,
      remixContext,
      i18nInstance,
    );

    const {pipe, abort} = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <EmotionCacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RemixServer context={remixContext} url={request.url} />
          </ThemeProvider>
        </EmotionCacheProvider>
      </I18nextProvider>,
      {
        onAllReady: () => {
          const bodyWithStyles = emotionServer.renderStylesToNodeStream();
          reactBody.pipe(bodyWithStyles);
          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(bodyWithStyles as any, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(reactBody);
        },
        onShellError: (error: unknown) => {
          console.error('Shell Error:', error);
          reject(error);
        },
        onError: (error: unknown) => {
          didError = true;
          console.error('Render Error:', error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });

export default handleRequest;
