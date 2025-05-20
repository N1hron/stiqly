import { useCallback } from 'react';

import { useLoadApp, useAppDispatch } from '@hooks';
import { terminateFFmpeg } from '@/ffmpeg';
import { removeAllFiles } from '@slices/files';
import { setStatus } from '@slices/status';
import { ReloadingKind } from '@types';

function useReloadApp() {
  const dispatch = useAppDispatch();
  const loadApp = useLoadApp();

  const reloadApp = useCallback(
    (kind: ReloadingKind = 'reload') => {
      terminateFFmpeg();
      dispatch(removeAllFiles());
      dispatch(
        setStatus({
          type: 'loading',
          message: kind === 'retry' ? 'Trying again' : 'Restarting application',
          loadingKind: kind,
          errorKind: null,
        })
      );
      loadApp();
    },
    [loadApp]
  );

  return reloadApp;
}

export { useReloadApp };
