import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStatus } from '@types';

type StatusState = AppStatus;

const initialState: StatusState = {
  type: 'loading',
  message: 'Starting up application',
  loadingKind: 'initial',
  didInit: false,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Partial<StatusState>>) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectStatus: (state) => state,
  },
});

export const statusReducer = statusSlice.reducer;
export const { setStatus } = statusSlice.actions;
export const { selectStatus } = statusSlice.selectors;
