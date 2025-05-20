import { ReloadingKind, StatusType } from '@types';

import { StatusMessage } from '@components/status-message/StatusMessage';
import { ReloadApp } from '@components/reload-app/ReloadApp';

import styles from './style.module.scss';

type AppStatusProps<S extends StatusType> = {
  type: S;
  message: string;
  appReloadKind?: S extends 'error' ? ReloadingKind : never;
} & (S extends 'error'
  ? {
      appReloadKind?: ReloadingKind;
      onAppReload?: () => void;
    }
  : {
      appReloadKind?: never;
      onAppReload?: never;
    });

function AppStatus<S extends StatusType>({
  type,
  message,
  appReloadKind,
  onAppReload,
}: AppStatusProps<S>) {
  return (
    <div className={styles.appStatus}>
      <StatusMessage type={type} message={message} />
      {type === 'error' && (
        <ReloadApp kind={appReloadKind} onReload={onAppReload} />
      )}
    </div>
  );
}

export { AppStatus };
