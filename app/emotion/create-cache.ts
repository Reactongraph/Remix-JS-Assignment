import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

//
//

export const createEmotionCache = (dir?: 'ltr' | 'rtl') => {
  return createCache({
    key: 'css',
    // stylisPlugins: [prefixer, rtlPlugin],
    stylisPlugins: dir === 'rtl' ? [prefixer, rtlPlugin] : undefined,
  });
};
