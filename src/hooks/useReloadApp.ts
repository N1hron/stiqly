import { useCallback } from 'react';

import { useLoadApp, useAppDispatch } from '@hooks';
import { terminateFFmpeg } from '@/ffmpeg';
import { removeAllFiles } from '@slices/files';
import { setStatus } from '@slices/status';

function useReloadApp() {
  const dispatch = useAppDispatch();
  const loadApp = useLoadApp();

  const reloadApp = useCallback(
    (isRetry: boolean) => {
      dispatch(
        setStatus({
          type: 'loading',
          message: isRetry ? 'Trying again' : 'Restarting application',
          loadingKind: isRetry ? 'retry' : 'reload',
          errorKind: undefined,
        })
      );
      dispatch(removeAllFiles());
      terminateFFmpeg();
      loadApp();
    },
    [loadApp]
  );

  return reloadApp;
}

export { useReloadApp };
