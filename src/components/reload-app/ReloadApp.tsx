import RefreshIcon from '@icons/refresh.svg?react';
import { Button } from '@components/button/Button';
import { useReloadApp } from '@hooks';
import { ReloadingKind } from '@types';

import styles from './style.module.scss';

type ReloadAppProps = {
  kind?: ReloadingKind;
  onReload?: () => void;
};

function ReloadApp({ kind, onReload }: ReloadAppProps) {
  const reloadApp = useReloadApp();
  const label = kind === 'retry' ? 'Try again' : 'Restart application';

  function onClick() {
    reloadApp(kind);
    if (onReload) onReload();
  }

  return (
    <Button className={styles.reloadApp} onClick={onClick}>
      <RefreshIcon aria-hidden />
      {label}
    </Button>
  );
}

export { ReloadApp };
