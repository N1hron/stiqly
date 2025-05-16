import { useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import UploadIcon from '@icons/upload.svg?react';
import { Button } from '@components/button/Button';
import { useAppDispatch, useAppSelector } from '@hooks';
import { addFile, selectAllFiles } from '@slices/files';
import { FILE_ACCEPT, FILE_LIMIT } from '@constants';
import { getFileInfo } from '@utils';

import styles from './style.module.scss';

function Upload() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const existingFiles = useAppSelector(selectAllFiles);

  function handleClick() {
    const input = inputRef.current;
    if (input) input.click();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files) return;

    const newFiles = files
      .filter((file) => {
        return !existingFiles.find(
          ({ info }) => info.name === file.name && info.size === file.size
        );
      })
      .slice(0, FILE_LIMIT - existingFiles.length);

    for (const file of newFiles) {
      getFileInfo(file)
        .then((info) => {
          dispatch(
            addFile({
              id: nanoid(),
              info,
              url: URL.createObjectURL(file),
              isSelected: false,
            })
          );
        })
        .catch(console.log);
    }

    event.target.value = '';
  }

  return (
    <div className={styles.upload}>
      <Button className={styles.button} onClick={handleClick}>
        <UploadIcon aria-hidden />
        <span>Upload</span>
      </Button>
      <input
        ref={inputRef}
        type='file'
        accept={FILE_ACCEPT}
        multiple
        onChange={handleChange}
      />
    </div>
  );
}

export { Upload };
