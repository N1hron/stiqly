import { RemoveAll } from './RemoveAll';
import { Upload } from './Upload';

import styles from './style.module.scss';

function Actions() {
  return (
    <div className={styles.actions}>
      <RemoveAll />
      <Upload />
    </div>
  );
}

export { Actions };
