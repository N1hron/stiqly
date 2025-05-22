import { useCallback, useRef } from 'react';

import { TimeoutId } from '@types';
import { useAppDispatch } from '@hooks';
import { loadFFmpeg } from '@/ffmpeg';
import { setStatus } from '@slices/status';

function useLoadApp() {
  const dispatch = useAppDispatch();
  const timeoutIdRef = useRef<TimeoutId>(null);

  const loadApp = useCallback(() => {
    loadFFmpeg()
      .then(() => {
        dispatch(
          setStatus({
            type: 'success',
            message: 'Successfully started application',
            didInit: true,
          })
        );

        const timeoutId = timeoutIdRef.current;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutIdRef.current = setTimeout(() => {
          dispatch(
            setStatus({
              type: 'running',
              message: '',
              loadingKind: undefined,
            })
          );
        }, 1000);
      })
      .catch(() => {
        dispatch(
          setStatus({
            type: 'error',
            message: 'Could not start application',
            errorKind: 'loading',
            loadingKind: undefined,
          })
        );
      });
  }, []);

  return loadApp;
}

export { useLoadApp };
