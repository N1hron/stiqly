import { ReactNode } from 'react';

import { Uploader } from '@components/uploader/Uploader';
import { AppLoader } from '@components/AppLoader';
import { AppErrorBoundary } from '@components/AppErrorBoundary';

import styles from './style.module.scss';

function App() {
  return (
    <AppLayout>
      <AppErrorBoundary>
        <AppLoader>
          <Uploader />
        </AppLoader>
      </AppErrorBoundary>
    </AppLayout>
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
