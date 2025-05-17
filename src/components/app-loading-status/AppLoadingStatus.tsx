import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import ErrorIcon from '@icons/error.svg?react';
import LoadingIcon from '@icons/loading.svg?react';
import RefreshIcon from '@icons/refresh.svg?react';
import SuccessIcon from '@icons/success-circle.svg?react';
import { Button } from '@components/button/Button';
import { loadFFmpeg } from '@/ffmpeg';

import styles from './style.module.scss';

type AppLoadingStatusProps = {
  children?: React.ReactNode;
};

type AppLoadingStatusType = 'loading' | 'success' | 'error';

function AppLoadingStatus({ children }: AppLoadingStatusProps) {
  const [status, setStatus] = useState<AppLoadingStatusType | null>('loading');
  const [isFirst, setIsFirst] = useState(true);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(null);

  function showContentAfter(ms: number) {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutIdRef.current = setTimeout(() => {
      setStatus(null);
    }, ms);
  }

  function load() {
    setStatus('loading');

    loadFFmpeg()
      .then(() => {
        setStatus('success');
        showContentAfter(1000);
      })
      .catch(() => {
        setStatus('error');
      })
      .finally(() => {
        if (isFirst) {
          setIsFirst(false);
        }
      });
  }

  useEffect(load, []);

  function renderIcon() {
    switch (status) {
      case 'loading':
        return <LoadingIcon title='Loading' />;
      case 'error':
        return <ErrorIcon title='Error' />;
      case 'success':
        return <SuccessIcon title='Success' />;
    }
  }

  function renderMessage() {
    switch (status) {
      case 'loading':
        if (isFirst) {
          return 'Starting up application';
        } else {
          return 'Trying again';
        }
      case 'error':
        return 'Could not start application';
      case 'success':
        return 'Successfully started application';
    }
  }

  return (
    <AnimatePresence>
      {status ? (
        <motion.div
          className={clsx(styles.appLoadingStatus, styles[status])}
          key='app-status'
          transition={{ ease: [0.5, 0, 0.5, 2] }}
          initial={{ opacity: 0, x: '-50%', y: '-75%' }}
          animate={{ opacity: 1, x: '-50%', y: '-50%' }}
          exit={{
            opacity: 0,
            x: '-50%',
            y: '-75%',
            transition: {
              ease: [0.5, -1, 0.5, 1],
            },
          }}
        >
          <div className={styles.iconWrapper}>{renderIcon()}</div>
          <p className={styles.message}>{renderMessage()}</p>
          {status === 'error' && (
            <Button className={styles.tryAgain} ghost onClick={load}>
              <RefreshIcon />
              <span>Try again</span>
            </Button>
          )}
        </motion.div>
      ) : (
        children
      )}
    </AnimatePresence>
  );
}

export { AppLoadingStatus };
