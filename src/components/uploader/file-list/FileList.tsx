import { useAppSelector } from '@hooks';
import { selectAllFiles } from '@slices/files';
import { FileListItem } from './FileListItem';

import styles from './style.module.scss';

function FileList() {
  const files = useAppSelector(selectAllFiles);

  if (!files.length) return null;
  return (
    <ul className={styles.fileList}>
      {files.map((file) => (
        <FileListItem key={file.id} {...file} />
      ))}
    </ul>
  );
}

export { FileList };
