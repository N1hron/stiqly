import { ReactNode, useEffect } from 'react';

import { useAppSelector, useLoadApp } from '@hooks';
import { selectStatus } from '@slices/status';
import { AppStatus } from './app-status/AppStatus';

type AppLoaderProps = {
  children?: ReactNode;
};

function AppLoader({ children }: AppLoaderProps) {
  const status = useAppSelector(selectStatus);
  const loadApp = useLoadApp();

  useEffect(() => {
    if (!status.didInit) loadApp();
  }, []);

  if (status.type === 'running') return children;
  return <AppStatus />;
}

export { AppLoader };
