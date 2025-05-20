import { ReactNode } from 'react';

import { Uploader } from '@components/uploader/Uploader';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { AppLoader } from '@components/AppLoader';
import { AppStatus } from '@components/app-status/AppStatus';

import styles from './style.module.scss';

function App() {
  return (
    <AppLayout>
      <ErrorBoundary fallback={renderErrorMessage}>
        <AppLoader>
          <Uploader />
        </AppLoader>
      </ErrorBoundary>
    </AppLayout>
  );
}

function renderErrorMessage(message: string, restore: () => void) {
  return (
    <AppStatus
      type='error'
      message={message}
      appReloadKind='reload'
      onAppReload={restore}
    />
  );
}

type AppLayoutProps = {
  children?: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

export { App };
