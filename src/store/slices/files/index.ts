import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileInput } from '@types';

type FilesState = FileInput[];

const initialState: FilesState = [];

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<FileInput>) => {
      return [...state, action.payload];
    },
    removeAllFiles: () => {
      return [];
    },
    removeFileById: (state, action: PayloadAction<FileInput['id']>) => {
      return state.filter((file) => file.id != action.payload);
    },
  },
});

export const filesReducer = filesSlice.reducer;
export const { addFile, removeAllFiles, removeFileById } = filesSlice.actions;
export * from './selectors';
