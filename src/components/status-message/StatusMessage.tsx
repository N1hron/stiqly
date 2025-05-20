import clsx from 'clsx';
import { ReactNode } from 'react';

import LoadingIcon from '@icons/loading.svg?react';
import SuccessIcon from '@icons/success-circle.svg?react';
import ErrorIcon from '@icons/error.svg?react';
import { Status } from '@types';

import styles from './style.module.scss';

type StatusMessageProps = Status & {
  className?: string;
};

const statusIcons: {
  [K in StatusMessageProps['type']]: ReactNode;
} = {
  loading: <LoadingIcon title='Loading' />,
  success: <SuccessIcon title='Success' />,
  error: <ErrorIcon title='Error' />,
};

function StatusMessage({ type, message, className }: StatusMessageProps) {
  const cn = clsx(styles.statusMessage, styles[type], className);

  return (
    <div className={cn}>
      <div className={styles.icon}>{statusIcons[type]}</div>
      <p className={styles.text}>{message}</p>
    </div>
  );
}

export { StatusMessage };
