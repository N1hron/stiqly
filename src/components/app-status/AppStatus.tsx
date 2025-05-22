import { StatusMessage } from '@components/status-message/StatusMessage';
import { ReloadApp } from '@components/reload-app/ReloadApp';

import styles from './style.module.scss';
import { useAppSelector } from '@hooks';
import { selectStatus } from '@slices/status';

type AppStatusProps = {
  onReload?: () => void;
};

function AppStatus({ onReload }: AppStatusProps) {
  const status = useAppSelector(selectStatus);

  if (status.type === 'running') return null;
  return (
    <div className={styles.appStatus}>
      <StatusMessage type={status.type} message={status.message} />
      {status.type === 'error' && (
        <ReloadApp
          isRetry={status.errorKind === 'loading'}
          onReload={onReload}
        />
      )}
    </div>
  );
}

export { AppStatus };
