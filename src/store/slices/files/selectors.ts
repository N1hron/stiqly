import { RootState } from '@store';

const selectAllFiles = (state: RootState) => {
  return state.files;
};

export { selectAllFiles };
