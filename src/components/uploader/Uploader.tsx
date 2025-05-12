import { ScrollArea } from '@components/scroll-area/ScrollArea';
import { FileList } from './file-list/FileList';
import { Actions } from './actions/Actions';

import styles from './style.module.scss';

function Uploader() {
  return (
    <div className={styles.uploader}>
      <div className={styles.content}>
        <ScrollArea>
          <FileList />
        </ScrollArea>
      </div>
      <Actions />
    </div>
  );
}

export { Uploader };
