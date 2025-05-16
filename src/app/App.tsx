import { Uploader } from '@components/uploader/Uploader';

import styles from './style.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.content}>
          <Uploader />
        </main>
      </div>
    </div>
  );
}

export default App;
