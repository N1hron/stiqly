// import { useEffect, useState } from 'react';
import { Uploader } from '../components/uploader/Uploader';
// import { loadFFmpeg } from '@/ffmpeg';

import styles from './style.module.scss';

// let didInit = false;

function App() {
  // const [ffmpegStatus, setFFmpegStatus] = useState<
  //   'loading' | 'success' | 'error'
  // >('loading');

  // useEffect(() => {
  //   if (didInit) return;
  //   loadFFmpeg()
  //     .then(() => {
  //       setFFmpegStatus('success');
  //     })
  //     .catch(() => {
  //       setFFmpegStatus('error');
  //     })
  //     .finally(() => {
  //       didInit = true;
  //     });
  // }, []);

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.content}>
          {/* {ffmpegStatus === 'success' ? <Uploader /> : null} */}
          <Uploader />
        </main>
      </div>
    </div>
  );
}

export default App;
