import {useState, useMemo, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {CacheProvider} from '@emotion/react';

import {createEmotionCache} from './create-cache';
import {EmotionStyleContext} from './style-context';

//
//

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

export const ClientCacheProvider: React.FC<ClientCacheProviderProps> = ({
  children,
}: ClientCacheProviderProps) => {
  const {i18n} = useTranslation();
  const dir = i18n.dir();

  const currentDir = useRef(dir);
  const [cache, setCache] = useState(createEmotionCache(dir));

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache(dir));
      },
    }),
    [dir],
  );

  useEffect(() => {
    if (currentDir.current === dir) return;
    clientStyleContextValue.reset();
    currentDir.current = dir;
  }, [clientStyleContextValue, dir]);

  return (
    <EmotionStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </EmotionStyleContext.Provider>
  );
};
