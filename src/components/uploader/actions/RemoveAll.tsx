import { useAppDispatch } from '@hooks';
import { removeAllFiles } from '@slices/files';
import { Button } from '@components/button/Button';
import TrashIcon from '@icons/trash.svg?react';

import styles from './style.module.scss';

function RemoveAll() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(removeAllFiles());
  }

  return (
    <Button
      className={styles.removeAll}
      color='red'
      ghost
      onClick={handleClick}
    >
      <TrashIcon aria-hidden />
      <span>Remove all</span>
    </Button>
  );
}

export { RemoveAll };
