import { ReactNode } from 'react';

import { ErrorBoundary } from '@components/ErrorBoundary';
import { AppStatus } from './app-status/AppStatus';
import { useAppDispatch } from '@hooks';
import { setStatus } from '@slices/status';

type AppErrorBoundaryProps = {
  children?: ReactNode;
};

function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const dispatch = useAppDispatch();

  function handleError(message: string) {
    dispatch(
      setStatus({
        type: 'error',
        message,
        errorKind: 'runtime',
        loadingKind: undefined,
      })
    );
  }

  return (
    <ErrorBoundary fallback={renderErrorMessage} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
}

function renderErrorMessage(_: string, restore: () => void) {
  return <AppStatus onReload={restore} />;
}

export { AppErrorBoundary };
