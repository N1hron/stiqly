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
    setFileSelectionById: (
      state,
      action: PayloadAction<Pick<FileInput, 'id' | 'isSelected'>>
    ) => {
      const file = state.find((file) => file.id === action.payload.id);
      if (file) {
        file.isSelected = action.payload.isSelected;
      }
    },
    setFilesSelection: (
      state,
      action: PayloadAction<FileInput['isSelected']>
    ) => {
      for (const file of state) {
        file.isSelected = action.payload;
      }
    },
  },
  selectors: {
    selectAllFiles: (state) => state,
  },
});

export const filesReducer = filesSlice.reducer;
export const {
  addFile,
  removeAllFiles,
  removeFileById,
  setFileSelectionById,
  setFilesSelection,
} = filesSlice.actions;
export const { selectAllFiles } = filesSlice.selectors;
