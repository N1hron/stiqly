import RefreshIcon from '@icons/refresh.svg?react';
import { Button } from '@components/button/Button';
import { useReloadApp } from '@hooks';

import styles from './style.module.scss';

type ReloadAppProps = {
  isRetry?: boolean;
  onReload?: () => void;
};

function ReloadApp({ isRetry = false, onReload }: ReloadAppProps) {
  const reloadApp = useReloadApp();
  const label = isRetry ? 'Try again' : 'Restart application';

  function onClick() {
    reloadApp(isRetry);
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
