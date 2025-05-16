import clsx from 'clsx';

import TrashIcon from '@icons/trash.svg?react';
import { Button } from '@components/button/Button';
import { FileInput } from '@types';
import { useAppDispatch } from '@hooks';
import {
  removeFileById,
  setFileSelectionById,
  setFilesSelection,
} from '@slices/files';

import styles from './style.module.scss';

type FileListItemProps = FileInput;

function FileListItem({
  id,
  info: { name },
  url,
  isSelected,
}: FileListItemProps) {
  const dispatch = useAppDispatch();
  const cn = clsx(styles.fileListItem, isSelected && styles.selected);

  function handleRemoveClick() {
    dispatch(removeFileById(id));
  }

  function handleClick() {
    if (!isSelected) {
      dispatch(setFilesSelection(false));
      dispatch(setFileSelectionById({ id, isSelected: !isSelected }));
    }
  }

  return (
    <li className={cn} onClick={handleClick}>
      <div className={styles.selectionWrapper}>
        <div className={styles.selection}></div>
      </div>
      <article className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.preview}>
          <img src={url} alt={`Preview for ${name}`} />
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
