import { configureStore } from '@reduxjs/toolkit';
import { filesReducer } from './slices/files';

const store = configureStore({
  reducer: {
    files: filesReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
