import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {RemixBrowser} from '@remix-run/react';
import i18next from 'i18next';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {getInitialNamespaces} from 'remix-i18next/client';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '~/global/components/mui/theme';

import {ClientCacheProvider} from '~/emotion/client-cache';
import i18n from '~/localization/i18n';

//
//

const hydrate = async () => {
  if (!i18next.isInitialized)
    await i18next
      .use(initReactI18next) // Tell i18next to use the react-i18next plugin
      .use(LanguageDetector) // Setup a client-side language detector
      .use(Backend) // Setup your backend
      .init({
        ...i18n, // spread the configuration
        // This function detects the namespaces your routes rendered while SSR use
        ns: getInitialNamespaces(),
        backend: {loadPath: '/locales/{{lng}}/{{ns}}.json'},
        detection: {
          // Here only enable htmlTag detection, we'll detect the language only
          // server-side with remix-i18next, by using the `<html lang>` attribute
          // we can communicate to the client the language detected server-side
          order: ['htmlTag'],
          // order: ["htmlTag", 'localStorage'],
          // lookupLocalStorage: 'lang',
          // Because we only use htmlTag, there's no reason to cache the language
          // on the browser, so we disable it
          caches: [],
        },
        // Disabling suspense is recommended
        react: {useSuspense: false},
      });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <ClientCacheProvider>
          <StrictMode>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <RemixBrowser />
            </ThemeProvider>
          </StrictMode>
        </ClientCacheProvider>
      </I18nextProvider>,
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
