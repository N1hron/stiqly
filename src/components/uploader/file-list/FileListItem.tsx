import { Button } from '@components/button/Button';
import { FileInput } from '@types';
import { useAppDispatch } from '@hooks';
import { removeFileById } from '@slices/files';
import TrashIcon from '@icons/trash.svg?react';
import tempImg from 'C:/Users/n1hro/Pictures/Screenshots/Снимок экрана 2025-01-26 230025.png';

import styles from './style.module.scss';

type FileListItemProps = FileInput;

function FileListItem({
  id,
  info: { name, duration },
  url,
}: FileListItemProps) {
  const dispatch = useAppDispatch();
  const previewUrl = duration > 0.5 ? tempImg : url;

  function handleRemoveClick() {
    dispatch(removeFileById(id));
  }

  return (
    <li className={styles.fileListItem}>
      <article className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.preview}>
          <img src={previewUrl} alt={`Preview for ${name}`} />
        </div>
        <div className={styles.remove}>
          <Button color='red' onClick={handleRemoveClick}>
            <TrashIcon />
          </Button>
        </div>
      </article>
    </li>
  );
}

export { FileListItem };
